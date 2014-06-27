/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'wzqr',

    extend: 'wzqr.Application',
    
    autoCreateViewport: true
});

function error() {
//<debug>    
    if (typeof console !== 'undefined') {
        (console.error || console.log).apply(console, [].slice.call(arguments));
    }
//</debug>    
}

function log() {
//<debug>    
    if (typeof console !== 'undefined') {
        (console.log || console.error).apply(console, [].slice.call(arguments));
    }
//</debug>    
}
debug = log;
