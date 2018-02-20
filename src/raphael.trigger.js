Raphael.el.trigger = function (eventName) {
    for (var i = 0, len = this.events.length; i < len; i++) {
        if (this.events[i].name == eventName) {
            this.events[i].f.call(this);
        }
    }
};
