var inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

var pubSub = (function () {
    var events = {},
        on = function (eventName, fn, arg) {
            events[eventName] = events[eventName] || [];
            if (arg) {
                events[eventName].push({fn: fn, arg: arg});
                return false;
            }
            events[eventName].push(fn);
        },
        off = function(eventName, fn) {
            if (events[eventName]) {
                for (var i = 0; i < events[eventName].length; i++) {
                    if (events[eventName][i] === fn || events[eventName][i]['fn'] === fn) {
                        events[eventName].splice(i, 1);
                        break;
                    }
                }
            }
        },
        emit = function (eventName, data) {
            if (events[eventName]) {
                for (var i = 0; i < events[eventName].length; i++) {
                    var currentFn = events[eventName][i];
                    if (typeof currentFn === 'object') {
                        if (typeof currentFn.fn === 'function' && currentFn.arg !== undefined) currentFn.fn(currentFn.arg);
                    } else {
                        currentFn(data);
                    }
                }
            }
        };

    return {
        on: on,
        off: off,
        emit: emit
    };
})();