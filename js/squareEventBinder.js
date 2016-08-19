var SquareEventBinder = (function() {
    return {
        setupEvents: function(element, canvas) {
            var moving = false;
            var startX = 0;
            var startY = 0;
            var squareStartX = 0;
            var squareStartY = 0;
            var squareOriginalHeight = 0;
            var squareOriginalWidth = 0;
            var square = null;
            element.mousedown(function(event) {
                square = canvas.findSquare(event.pageX, event.pageY);
                if (square === null) {
                    return;
                }

                startX = event.pageX;
                startY = event.pageY;
                Logger.debug("mouse start: (" + startX + "," + startY + ")");
                squareStartX = square.getX1();
                squareStartY = square.getY1();
                squareOriginalHeight = square.getHeight();
                squareOriginalWidth = square.getWidth();
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
                        var edgeTouched = square.getEdgeTouched();
                        var dx = event.pageX - startX;
                        var dy = event.pageY - startY;
                        Logger.debug("deltas: (" + dx + "," + dy + ")");
                        if (edgeTouched === null){
                            square.setX1(squareStartX + dx);
                            square.setY1(squareStartY + dy);
                        } else {
                            if (edgeTouched === Edge.Bottom) {
                                square.setHeight(squareOriginalHeight + dy);
                            } else if (edgeTouched === Edge.Right) {
                                square.setWidth(squareOriginalWidth + dx);
                            } else if (edgeTouched === Edge.Top) {
                                square.setY1(squareStartY + dy);
                                square.setHeight(squareOriginalHeight - dy);
                            } else if (edgeTouched === Edge.Left) {
                                square.setX1(squareStartX + dx);
                                square.setWidth(squareOriginalWidth - dx);
                            }
                        }
                    }
                }

                canvas.update();
            });
        }
    };
}());