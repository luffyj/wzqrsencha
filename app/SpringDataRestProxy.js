Ext.define('wzqr.SpringDataRestProxy', {
    extend: 'Ext.data.proxy.Rest',
    alternateClassName: 'Ext.data.SpringRestProxy',
    alias: 'proxy.springrest',
    limitParam: 'size',
    getParams: function() {
        var me = this;
        var params = me.callParent(arguments);
        var pageParam = me.pageParam;
        params[pageParam] = params[pageParam] - 1;
        return params;
    }, constructor: function(config) {
        //覆盖初始化 以更换reader中的各个方法
        //是否需要建立一个初始化函数 将实现者给予的url中的具体实例名 作为参数 传给reader
        this.callParent(arguments);
        Ext.override(this.reader,{
            getTotal:function(data){
                if (data.page){
                    return data.page.totalElements;
                }
                return 'k';
            },
            getRoot:function(data){
                var edata = data._embedded;
                // 里面应该只有一个值如何获取？
                for(var key in edata){
                    if (edata.hasOwnProperty(key) && Ext.isArray(edata[key])){
                        return edata[key];
                    }
                }
                return data;
            }
        });
        
    }
});