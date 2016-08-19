var SquareEventBinder = (function() {
    return {
        setupEvents: function(element, canvas) {
            var moving = false;
            var startX = 0;
            var startY = 0;
            var squareStartX = 0;
            var squareStartY = 0;
            var square = null;
            element.mousedown(function(event) {
                square = canvas.findSquare(event.pageX, event.pageY);
                if (square === null) {
                    return;
                }

                startX = event.pageX;
                startY = event.pageY;
                Logger.debug("mouse start: (" + startX + "," + startY + ")");
                squareStartX = square.getX();
                squareStartY = square.getY();
                Logger.debug("square start: (" + squareStartX + "," + squareStartY + ")");
                moving = true;
            });

            element.mouseup(function() {
                if (square !== null && square.parentSquare !== null) {
                    canvas.deleteSquare(square.parentSquare);
                }
                
                moving = false;
                square = null;
            });
            element.mousemove(function(event) {
                if (!moving){
                    var newSquare = canvas.findSquare(event.pageX, event.pageY);
                    if (newSquare !== square && square !== null) {
                        square.isTouched = false;
                    }
                
                    square = newSquare;
                    if (square !== null) {
                        square.detectEdgeTouched(event.pageX, event.pageY);
                    }
                }
                
                if (square !== null) {
                    square.isTouched = true;
                    if (moving) {
                        var dx = event.pageX - startX;
                        var dy = event.pageY - startY;
                        Logger.debug("deltas: (" + dx + "," + dy + ")");
                        square.setX(squareStartX + dx);
                        square.setY(squareStartY + dy);
                    }
                }

                canvas.update();
            });
        }
    };
}());