Ext.define('wzqr.store.UnderOrg', {    
    extend: 'Ext.data.Store',    
//    storeId:'UnderOrg',
    model: 'wzqr.model.Org',
    proxy: {
        type: 'springrest',
        
        url: Utils.toApi('api/org')
    },
//    autoLoad: true
});