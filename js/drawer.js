CanvasDrawer = function() {
    var squares = [];
    var elements = [];
    var addElement = function(element, square) {
        element.className = "square";
        squares.push(square);
        elements.push(element);
        $("#square_container").append(element);
    };
    
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
            switch (square.getType()){
                case "ColourSquare":
                    element = document.createElement("div");
                    break;
                case "ImageSquare":
                    element = document.createElement("img");
                    element.draggable = false;
                    break;
                default:
                    alert("Unknown square type");
                    return;
            }

            if (element !== null) {
                addElement(element, square);
                var closeSquare = square.getCloseSquare();
                if (closeSquare !== null) {
                    var closeElement = document.createElement("div");
                    addElement(closeElement, closeSquare);
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
                switch (square.getType()) {
                    case "ColourSquare":
                        element.style.background = square.displayColour;
                        break;
                    case "ImageSquare":
                        element.src = square.imageSource;
                        break;
                    default:
                        alert("Unknown square type");
                        return;
                }

                element.style.left = Utils.toPixels(square.getX1());
                element.style.top = Utils.toPixels(square.getY1());
                element.style.width = Utils.toPixels(square.getWidth());
                element.style.height = Utils.toPixels(square.getHeight());
                element.style.opacity = square.isTouched ? 0.5 : 1;
                
                switch(square.getEdgeTouched()){
                    case Edge.Top:
                    case Edge.Bottom:
                        element.style.cursor = "ns-resize";
                        break;
                    case Edge.Left:
                    case Edge.Right:
                        element.style.cursor = "ew-resize";
                        break;
                    default:
                        element.style.cursor = "default";
                        break;
                }
            }
        },
    };
};