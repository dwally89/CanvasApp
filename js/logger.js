var Logger = (function() {
    return {
        isDebug : false,
        debug : function(message) {
            if (this.isDebug){
                console.log("debug: " + message);
            }
        }
    }
}());