var Utils = (function() {
    return {
        toPixels: function(val) {
            return val + "px";
        },
        deleteAtIndex: function(array, index) {
            array.splice(index, 1);
        },
        deleteFromArray: function(array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    this.deleteAtIndex(array, i);
                    return i;
                }
            }

            return -1;
        }
    };
}());