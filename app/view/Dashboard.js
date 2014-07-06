Ext.define("wzqr.view.Dashboard", {
//    extend: 'Ext.panel.Panel',
    extend: 'Ext.container.Container',
    requires: [
        'wzqr.view.Bottom',
        'wzqr.view.Top',
        'Ext.draw.Text',
        'Ext.ux.layout.Center'
    ],
    layout: 'ux.center',
//    top:0,
    items: [{
            xtype: 'panel',
//            top:0,
//            width: 1024,
            layout: 'fit',
            dockedItems: [
                {
                    xtype: 'xtop',
                    dock: 'top'
                }, {
                    xtype: 'xbottom',
                    dock: 'bottom'
                }
            ],
            items: [
                {
                    html: 'main!'
                }
            ]
        }]
});