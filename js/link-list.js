function Node(data, next) {
    this.data = data;
    this.next = next;
}

function LinkList(data) {
    var oThis = this;

    oThis.tail = oThis.head = null;
    oThis.length = 0;

    if(data) {
        data.forEach(function(value) {
            oThis.addNode(value);
        });
    }
}

LinkList.prototype = {
    constructor: LinkList,

    addNode: function(data) {
        var oThis = this,
            node;

        node = new Node(data);

        if(!oThis.head) {
            oThis.tail = oThis.head = node;
        } else {
            oThis.tail.next = node;
            oThis.tail = oThis.tail.next;
        }

        oThis.length++;
    },

    pop: function() {
        var oThis = this,
            nodeData = oThis.head.data;

        oThis.head = oThis.head.next;
        oThis.length--;

        return nodeData;
    },

    push: function(data) {
        return this.addNode(data);
    },

    print: function() {
        var oThis = this,
            current = oThis.head,
            displayBuffer = [];

        while(current) {
            displayBuffer.push(current.data);
            current = current.next;
        }

        console.log(displayBuffer.join('->'));
    },

    removeDuplicateNodes: function() {
        var oThis = this,
            current,
            previous,
            runner;

        if(oThis.length < 2) {
            return;
        }

        previous = oThis.head;
        current = previous.next;

        while(current) {
            runner = oThis.head;

            while(runner !== current) {
                if(runner.data === current.data) {
                    previous.next = current.next;
                    current = previous.next;
                    runner = oThis.head;

                    oThis.length--;
                } else {
                    runner = runner.next;
                }
            }

            previous = previous.next;
            current = previous.next;
        }
    }
};