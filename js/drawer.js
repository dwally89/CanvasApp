CanvasDrawer = function() {
    var squares = []
    var elements = [];
    return {
        verifyColour: function(colour) {
            var defaultColour = "rgb(0, 0, 0)";
            var element = document.createElement("div");
            // Set background to default colour first, to check if colour is valid
            element.style.background = defaultColour;
            element.style.background = colour;
            return colour !== '' && element.style.background != defaultColour;
        },
        addSquare: function(square) {
            var element = null;
            if (square.getType() === "ColourSquare") {
                element = document.createElement("div");
            }
            else if (square.getType() == "ImageSquare") {
                element = document.createElement("img");
                element.draggable = false;
            }

            if (element !== null) {
                element.className = "square";
                element.style.width = Utils.toPixels(square.getWidth());
                element.style.height = Utils.toPixels(square.getHeight());

                squares.push(square);
                elements.push(element);
                $("#square_container").append(element);

                var closeSquare = square.getCloseSquare();
                if (closeSquare !== null) {
                    var closeElement = document.createElement("div");
                    closeElement.style.position = "fixed";
                    closeElement.style.width = Utils.toPixels(closeSquare.getWidth());
                    closeElement.style.height = Utils.toPixels(closeSquare.getHeight());

                    elements.push(closeElement);
                    squares.push(closeSquare);
                    $("#square_container").append(closeElement);
                }
            }
        },
        deleteSquare: function(square) {
            var index = Utils.deleteFromArray(squares, square);
            $(elements[index]).remove();
            Utils.deleteAtIndex(elements, index);
        },
        draw: function() {
            for (var i = 0; i < squares.length; i++) {
                var square = squares[i];
                var element = elements[i];
                if (square.getType() === "ColourSquare") {
                    element.style.background = square.displayColour;
                }
                else if (square.getType() === "ImageSquare") {
                    element.src = square.imageSource;
                }

                element.style.left = Utils.toPixels(square.getX());
                element.style.top = Utils.toPixels(square.getY());
                element.style.opacity = square.isTouched ? 0.5 : 1;
            }
        },
    };
};