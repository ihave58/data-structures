function Queue() {
    var oThis = this;

    oThis.linklist = new LinkList();
}

Queue.prototype = {
    constructor: Queue,

    enqueue: function(data) {
        this.linklist.push(data);
    },

    dequeue: function() {
        return this.linklist.pop();
    },

    peek: function() {
        return this.linklist.head ? this.linklist.head.data : null;
    },

    size: function() {
        return this.linklist.length;
    },

    isEmpty: function() {
        return !this.linklist.length;
    }
};