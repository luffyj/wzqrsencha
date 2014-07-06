/**
 * 头部
 * */
Ext.define("wzqr.view.Top", {
//    extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'xtop',
    height: 100,
    dockedItems: [
        {
            width:130,
            xtype: 'image',
            padding: 5,
            dock: 'left',
            src: 'resources/images/logo.jpg'
        }, {
            margin: '20 20 0 0',
            xtype: 'panel',
            dock: 'right',
            width: 260,
            dockedItems: [
                {
                    xtype: 'panel',
                    dock: 'top',
                    layout: 'hbox',
                    dockedItems: [{
                            xtype: 'button',
                            dock:'right',
                            text: '退出'
                        }],
                    items: [
                        {
                            xtype: 'image',
                            src: 'resources/images/person.png'
                        }, {
                            html: '欢迎你，'
                        }, {
                            html: 'name'
                        }, {
                            html: '您的角色是'
                        }, {
                            html: 'role'
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
//            left:10,
            xtype:'component',
            margin:'20 0 0 30',
            style:'font-size:26px;',
            html:'温州市“580海外精英引进计划”网上申报系统'
        }
    ]
});