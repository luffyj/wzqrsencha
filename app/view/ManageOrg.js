Ext.define("wzqr.view.ManageOrg", {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.grid.Panel'
    ],
    xtype: 'xmanageorg',
    layout: 'fit',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'button',
            text: 'refresh'
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
//            title: 'Simpsons',
            store: 'UnderOrg',
            viewConfig: {
                stripeRows: true
            },
            columnLines: true,
//            selModel: 'rowmodel',
//            store: Ext.data.StoreManager.lookup('UnderOrg'),
            columns: [
                {text: '序号', xtype: 'rownumberer'},
                {text: 'Name', dataIndex: 'name'},
                {text: 'Email', dataIndex: 'description', flex: 1},
                {text: 'Phone', dataIndex: 'id'}
            ],
//            columns: [
//                {text: 'ID', dataIndex: 'id', width: 300},
//                {text: 'DESCRIPTION', dataIndex: 'description', width: 300,
//                    editor: {
//                        xtype: 'textfield',
//                        allowBlank: false
//                    }}
//            ],
//            plugins: [
//                Ext.create('Ext.grid.plugin.RowEditing', {
//                    clicksToEdit: 1
//                })
//            ],
//            dockedItems: [{
//                    xtype: 'toolbar',
//                    items: [{
//                            action: 'add',
//                            text: 'Add Something'
//                        }, '-', {
//                            action: 'remove',
//                            text: 'Remove Something',
//                            disabled: true
//                        }]
//                }],
//            width: 600,
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'UnderOrg',
//                    store: store, // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],
            height: 300
        }
    ]
});