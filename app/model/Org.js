Ext.define('wzqr.model.Org', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}

    ],
//    proxy: {
//        type: 'rest',
//        url: Utils.toApi('api/org')
//    }
});
