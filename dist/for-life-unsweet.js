var Queue$0 = function () {
};
var forEach$1 = Array.prototype.forEach;
module.exports = function () {
    function Tag(tag$2, predicate$3, document$4) {
        if (!(this instanceof Tag)) {
            return new Tag(tag$2, predicate$3, document$4);
        }
        this.tag = tag$2;
        if (typeof predicate$3 !== 'function') {
            document$4 = predicate$3;
        } else {
            this.predicate = predicate$3;
        }
        this.queue = new Queue$0();
        this.queue.addDocument = this.addDocument.bind(this);
        if (document$4) {
            this.addDocument(document$4);
        }
        return this.queue;
    }
    return Tag;
}();
module.exports.prototype.addDocument = function (document$5) {
    if (document$5) {
        var mutationObserver$6 = makeMutationObserver(this);
        mutationObserver$6.observe(document$5, {childList: true});
        var queue$7 = this.queue.put.bind(this.queue);
        forEach$1.call(document$5.getElementsByTagName(tag), queue$7);
    }
    return this.queue;
};
function makeMutationObserver(tag$8) {
    var queue$12 = tag$8.queue, put$13 = queue$12.put.bind(queue$12), mutationAddObserve$14 = function (val$17) {
            $1 = arguments[0];
            forEach$1.call($1.getElementsByTagName(this.tag), this);
        }.bind(put$13), mutationObserver$15 = function (val$18) {
            $1 = arguments[0];
            forEach$1.call($1.addedNodes, this);
        }.bind(mutationAddObserve$14), mutationsObserver$16 = function (val$19) {
            forEach$1.call(val$19, this);
        }.bind(mutationObserver$15);
    return new MutationObserver(mutationsObserver$16);
}