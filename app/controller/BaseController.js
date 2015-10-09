Ext.define('wzqr.controller.BaseController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax',
        'wzqr.view.ManageApplication',
        'wzqr.view.ManageOrg',
        'wzqr.view.Mine',
        'wzqr.view.Log',
        'wzqr.view.ManageUnit',
        'wzqr.view.Login',
        'wzqr.view.Dashboard'
    ],
    /**
     * 是一般申报人么？
     * @return {boolean} true for yes
     * */
    isPeople:function() {
        var user = this.getApplication().currentUser;
        if (!user)
            return false;
        return user.role.name==='申报人'
    },
    isAdmin: function() {
        //authority
        var user = this.getApplication().currentUser;
        if (!user)
            return false;
        var auths = user.authorities;
        return auths.some(function(auth) {
            return auth.authority === 'admin';
        });
    },
    /**
     * 是否允许打开操作日志界面
     * @return {boolean} true表示可以
     * */
    isManageLog: function() {
        var user = this.getApplication().currentUser;
        if (!user)
            return false;
        var auths = user.authorities;
        return this.isAdmin() || auths.some(function(auth) {
            return auth.authority === 'log';
        });
    },
    /**
     * 如果cross 是否可以打开管理部门界面
     * 只有系统管理员和市委可以打开
     * 在权限组织关系中 只有获得了部门管理权力和跨部门管理权力才可以
     * 
     * 反之则是申报单位的管理
     * 
     * 普通的次级管理员也可以获得部门(单位)管理权力
     * @param {boolean} cross 是否要求跨部门
     * */
    isManageOrg: function(cross) {
        var user = this.getApplication().currentUser;
        if (!user)
            return false;
        var auths = user.authorities;
        return this.isAdmin() || (auths.some(function(auth) {
            return auth.authority === 'manageOrganization';
        }) && cross ? auths.some(function(auth) {
            return auth.authority === 'cross';
        }) : true);
    },
    checkAuth: function() {
        debug('run checkAuth');
        Utils.startLoading();
        Ext.Ajax.request({
            url: Utils.toApi('queryUser'),
            scope: this,
            success: function(data, opts) {
                Utils.stopLoading();
                if (this._task_checkAuth) {
                    Ext.TaskManager.stop(this._task_checkAuth);
                    delete this._task_checkAuth;
                }
                if (data.responseText === 'anonymousUser') {
                    //to login page
                    Utils.push(this.getView('Login').create());
//                    Utils.viewport().removeAll();
//                    Utils.viewport().add(Ext.create('wzqr.view.Login'));
                } else {
                    var data = Ext.JSON.decode(data.responseText);
                    this.getApplication().currentUser = data;
                    this.isAdmin();
                    debug('login as ', data);
                    // 根据用户权限展开不同的管理页面

                    var pages = [
                        {
                            title: '申报管理',
                            xtype: 'xmanageapp'
                        }];

                    if (this.isManageOrg(true)) {
                        pages.push({
                            title: '管理部门',
                            xtype: 'xmanageorg'
                        });
                    } else if (this.isManageOrg(false)) {
                        pages.push({
                            title: '申报单位',
                            xtype: 'xmanageunit'
                        });
                    }

                    pages.push({
                        title: '我的账号',
                        xtype: 'xmine'
                    });

                    if (this.isManageLog()) {
                        pages.push({
                            title: '操作日志',
                            xtype: 'xlog'
                        });
                    }
                    
                    var dashboard = this.getView('Dashboard').create({
                        pages: pages
                    });
                    Utils.push(dashboard);
                    dashboard.down('xtop component[name=labelName]').update(data.realName);
                    dashboard.down('xtop component[name=labelRole]').update(data.role.name);
//                    dashboard.down('xtop component[name=labelRole]').html  = data.role.name;
//                    dashboard.down('xtop').doLayout();
                }
            },
            failure: function(data, opts) {
                debug('fail', data, opts, this);
                //如果失败 则稍后重新查询
                if (!this._task_checkAuth) {
                    this._task_checkAuth = Ext.TaskManager.newTask({
                        run: this.checkAuth,
                        scope: this,
                        interval: 5000
                    });
                    Ext.TaskManager.start(this._task_checkAuth);
                }
//                Ext.TaskManager.start(this._task_checkAuth);                
            }
        });
    }
});
