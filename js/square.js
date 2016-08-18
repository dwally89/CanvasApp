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
    square.getX = function() {
        return this.parentSquare.getX() + this.parentSquare.getWidth() - width;
    };
    
    square.getY = function() {
        return this.parentSquare.getY();
    };

    return square;
}

var ImageSquare = function(width, height, closeSquare, imageSource) {
    var square = new Square(width, height, "ImageSquare", closeSquare);
    square.imageSource = imageSource;
    return square;
};

var Square = function(width, height, type, closeSquare) {
    var x = 0;
    var y = 0;
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
            var minX = this.getX();
            var minY = this.getY();
            var maxX = minX + this.getWidth();
            var maxY = minY + this.getHeight();
            return pointX >= minX && pointX <= maxX && pointY >= minY && pointY <= maxY;
        },
        getX: function() {
            return x;
        },
        getY: function() {
            return y;
        },
        setX: function(newX) {
            x = newX;
        },
        setY: function(newY) {
            y = newY;
        }
    };

    if (closeSquare !== null) {
        closeSquare.parentSquare = square;
    }

    return square;
};