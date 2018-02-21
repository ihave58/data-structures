class TrieNode {
    constructor(data) {
        this.nodes = [];
        this.data = data;
    }

    addNode(node) {
        if(node == null) {
            throw new Error('invalidNode');
        }

        this.nodes.push(node);
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    addPath(string) {

    }

    find(string) {

    }
}