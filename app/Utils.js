/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('wzqr.Utils', {
    alternateClassName: "Utils",
    singleton: true,
    requires: [
        'Ext.Date'
    ],
    mixins: {
        myConfig: "wzqr.Config"
    },
    
    /**
     * how to use for in correctly
     * http://stackoverflow.com/questions/9329446/how-to-do-for-each-over-an-array-in-javascript
     * */
    arrayHasOwnIndex:function(array, prop) {
        return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
    },
    /**
     * 获取api的具体url
     * @param {string} name api的具体名字
     * */
    toApi: function(name) {
        return this.getApiRoot() + name;
    },
    /**
     * 打开菊花界面
     * 
     * */
    startLoading: function(msg) {
        if(!msg)
            msg = '处理中……';
        Ext.getBody().mask(msg);
    },
    stopLoading: function() {
        Ext.getBody().unmask();
    },
    /**
     * 当前页面的viewport
     * */
    viewport:function(){
        return Ext.ComponentQuery.query('viewport')[0];
    },
    /**
     * 清除原来的界面 载入该界面
     * */
    push:function(view){
        var vp = Utils.viewport();
        vp.removeAll();
        vp.add(view);
    }
});

