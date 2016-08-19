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
                squares.push(square);
                elements.push(element);
                $("#square_container").append(element);

                var closeSquare = square.getCloseSquare();
                if (closeSquare !== null) {
                    var closeElement = document.createElement("div");
                    closeElement.style.position = "fixed";

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

                element.style.left = Utils.toPixels(square.getX1());
                element.style.top = Utils.toPixels(square.getY1());
                element.style.width = Utils.toPixels(square.getWidth());
                element.style.height = Utils.toPixels(square.getHeight());
                element.style.opacity = square.isTouched ? 0.5 : 1;
                
                var edgeTouched = square.getEdgeTouched();
                if (edgeTouched === null){
                    element.style.cursor = "default";
                }else if (edgeTouched === Edge.Top || edgeTouched === Edge.Bottom){
                    element.style.cursor = "ns-resize";
                } else {
                    element.style.cursor = "ew-resize";
                }
            }
        },
    };
};