Ext.define('wzqr.controller.BaseController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax',
        'wzqr.view.Login',
        'wzqr.view.Dashboard'
    ],
    checkAuth: function() {
        debug('run checkAuth');
        Utils.startLoading();
        Ext.Ajax.request({
            url: Utils.toApi('queryUser'),
            scope:this,
            success:function(data,opts){
                Utils.stopLoading();
                if(this._task_checkAuth){
                    Ext.TaskManager.stop(this._task_checkAuth);
                    delete this._task_checkAuth;
                }
                if(data.responseText==='anonymousUser'){
                    //to login page
                    Utils.push(this.getView('Login').create());
//                    Utils.viewport().removeAll();
//                    Utils.viewport().add(Ext.create('wzqr.view.Login'));
                }else{
                    var data = Ext.JSON.decode(data.responseText);
                    this.getApplication().currentUser = data;
                    debug('login as ',data);
                    // 这里即将展开的是
                    //
                    Utils.push(this.getView('Dashboard').create({
                        pages:[
                            {
                                title:'第一个',
                                html:'哈哈1'
                            },{
                                title:'第二个',
                                html:'哈哈2'
                            }
                        ]
                    }));
                }
            },
            failure:function(data,opts){
                debug('fail',data,opts,this);
                //如果失败 则稍后重新查询
                if (!this._task_checkAuth){
                    this._task_checkAuth = Ext.TaskManager.newTask({
                        run:this.checkAuth,
                        scope:this,
                        interval:5000
                    });
                    Ext.TaskManager.start(this._task_checkAuth);
                }                
//                Ext.TaskManager.start(this._task_checkAuth);                
            }
        });
    }
});
