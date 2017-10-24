'use strict';

var RoundLinkedQueue = function RoundLinkedQueue(maxSize) {
    this.maxSize = maxSize;
    this.size = 0;
    this._root = null;
    this._last = null;
}

module.exports = RoundLinkedQueue;

RoundLinkedQueue.createNode = function(data, next) {
    next = next || null;
    return {
        data: data,
        next: next
    };
};

RoundLinkedQueue.prototype.push = function(data) {
    var node = RoundLinkedQueue.createNode(data);

    if (this.size < this.maxSize) {
        if (this._root === null) {
            this._last = this._root = node;
        } else {
            this._last.next = node;
            this._last = node;
        }
        this.size++;
    } else {
        var data = this._root.data;

        this._root = this._root.next;
        this._last.next = node;
        this._last = node;

        return data;
    }
};

RoundLinkedQueue.prototype.pop = function() {
    if (this.root === null) {
        throw new Error('Cannot pop from empty queue');
    }

    var data = this._root.data;
    
    this._root = this._root.next;
    this.size--;

    return data;
};

RoundLinkedQueue.prototype.first = function() {
    return this._root.data;
};

RoundLinkedQueue.prototype.last = function() {
    return this._last.data;
};