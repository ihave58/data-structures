function Node(data, next) {
    this.data = data;
    this.next = next;
}

function Stack(data) {
    var oThis = this;

    oThis.top = null;

    if(data) {
        data.forEach(function(dataElem) {
            oThis.push(dataElem);
        });
    }
}

Stack.prototype = {
    constructor: Stack,

    push: function(data) {
        var oThis = this,
            temp,
            node = new Node(data);

        if(!oThis.top) {
            oThis.top = node;
        } else {
            temp = oThis.top;
            oThis.top = node;
            oThis.top.next = temp;
        }
    },

    pop: function() {
        var oThis = this,
            data;

        if(!oThis.isEmpty()) {
            data = oThis.top.data;
            oThis.top = oThis.top.next;
        }

        return data;
    },

    peep: function() {
        var oThis = this;

        if(oThis.top) {
            return oThis.top.data;
        } else {
            return null;
        }
    },

    isEmpty: function() {
        return !this.top;
    },

    sort: function() {
        var oThis = this,
            topData,
            tempStack = new Stack();

        while(!oThis.isEmpty()) {
            topData = oThis.pop();

            while(!tempStack.isEmpty() && tempStack.peep() < topData) {
                oThis.push(tempStack.pop());
            }

            tempStack.push(topData);
        }

        return tempStack;
    }
};