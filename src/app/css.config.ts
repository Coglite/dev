let Module = require('module');
let _require = Module.prototype.require;
Module.prototype.require = function() {
    let name = arguments[0];
    if (/\.css$/.test(name)) {
        // no-op
        return;
    }
    return _require.apply(this, arguments);
}