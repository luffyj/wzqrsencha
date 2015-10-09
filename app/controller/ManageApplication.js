Ext.define('wzqr.controller.ManageApplication', {
    extend: 'wzqr.controller.BaseController',
    init: function(app) {
        this.control({
            'xmanageapp':{
                render:function(view){
                    if(this.isPeople()){
                        //removes
                        view.remove(view.down('xappreport'));
                        view.remove(view.down('xappselect'));
                    }
                }
            }
        });
    }
});
