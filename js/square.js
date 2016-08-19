var ColourSquare = function(width, height, closeSquare, colour) {
    var square = new Square(width, height, "ColourSquare", closeSquare);
    square.displayColour = colour;
    square.resetDisplayColour = function() {
        this.displayColour = colour;
    };

    return square;
};

var CloseSquare = function(width, height, colour) {
    var square = new ColourSquare(width, height, null, colour);
    square.getX1 = function() {
        return this.parentSquare.getX2() - width;
    };
    
    square.getY1 = function() {
        return this.parentSquare.getY1();
    };

    return square;
};

var ImageSquare = function(width, height, closeSquare, imageSource) {
    var square = new Square(width, height, "ImageSquare", closeSquare);
    square.imageSource = imageSource;
    return square;
};

var Edge = (function(){
    return {
        Bottom: "bottom",
        Top: "top",
        Left: "left",
        Right: "right"
    };
}());

var Square = function(width, height, type, closeSquare) {
    var x = 0;
    var y = 0;
    var edgeTouched = null;
    var square = {
        isTouched: false,
        parentSquare: null,
        getWidth: function() {
            return width;
        },
        getHeight: function() {
            return height;
        },
        getType: function() {
            return type;
        },
        getCloseSquare: function() {
            return closeSquare;
        },
        containsPoint: function(pointX, pointY) {
            return pointX >= this.getX1() && pointX <= this.getX2() && pointY >= this.getY1() && pointY <= this.getY2();
        },
        getX1: function() {
            return x;
        },
        getX2: function() {
            return this.getX1() + this.getWidth();
        },
        getY1: function() {
            return y;
        },
        getY2: function() {
            return this.getY1() + this.getHeight();
        },
        setX1: function(newX) {
            x = newX;
        },
        setY1: function(newY) {
            y = newY;
        },
        detectEdgeTouched: function(pointX, pointY) {
            var epsilon = 10;
            if (
                pointY >= this.getY1() - epsilon &&
                pointY <= this.getY1() + epsilon &&
                pointX >= this.getX1() - epsilon &&
                pointX <= this.getX2() + epsilon){
                edgeTouched = Edge.Top;
                Logger.debug("touched top");
            } else if(
                pointY >= this.getY2() - epsilon &&
                pointY <= this.getY2() + epsilon &&
                pointX >= this.getX1() - epsilon &&
                pointX <= this.getX2() + epsilon){
                edgeTouched = Edge.Bottom;
                Logger.debug("touched bottom");
            } else {
                edgeTouched = null;
                Logger.debug("didn't touch edge");
            }
        },
        getEdgeTouched: function(){
            return edgeTouched;
        }
    };

    if (closeSquare !== null) {
        closeSquare.parentSquare = square;
    }

    return square;
};