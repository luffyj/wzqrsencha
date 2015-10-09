Ext.define('wzqr.controller.ManageOrg', {
    extend: 'wzqr.controller.BaseController',
    models: ['Org'],
    stores: ['UnderOrg'],
    init: function(app) {
        this.getUnderOrgStore().on('load', function(store) {
            debug(store);
            var records = new Array();
            for (var i = store.pageSize - store.getCount(); i > 0; i--) {
                records.push(new store.model(/*you might need to provide default data here*/))
            }
            store.add(records);
        });

        this.control({
            'xmanageorg': {
                render: function(view) {
                    this.getUnderOrgStore().load();
                }
            },
            'xmanageorg button[text=refresh]': {
                click: function(button) {
                    this.getUnderOrgStore().reload();
                }
            }
        });
    }
});
