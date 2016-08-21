var SquareEventBinder = (function() {
    var getX = function(event) {
        var x = event.pageX;
        if (x === undefined) {
            x = event.originalEvent.touches[0].pageX;
        }
        
        return x;
    };
    var getY = function(event) {
        var y = event.pageY;
        if (y === undefined) {
            y = event.originalEvent.touches[0].pageY;
        }
        
        return y;
    };
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
            var downEvent = function(event) {
                var x = getX(event);
                var y = getY(event);
                square = canvas.findSquare(x, y);
                if (square === null) {
                    return;
                }
        
                startX = x;
                startY = y;
                Logger.debug("mouse start: (" + startX + "," + startY + ")");
                squareStartX = square.getX1();
                squareStartY = square.getY1();
                squareOriginalHeight = square.getHeight();
                squareOriginalWidth = square.getWidth();
                Logger.debug("square start: (" + squareStartX + "," + squareStartY + ")");
                moving = true;
            };
        
            var upEvent = function() {
                if (square !== null) {
                    square.isTouched = false;
                    if (square.parentSquare !== null) {
                        canvas.deleteSquare(square.parentSquare);
                    }
                }
        
                moving = false;
                square = null;
                canvas.update();
            };
        
            var moveEvent = function(event) {
                var x = getX(event);
                var y = getY(event);
                if (!moving) {
                    var newSquare = canvas.findSquare(x, y);
                    if (newSquare !== square && square !== null) {
                        square.isTouched = false;
                    }
        
                    square = newSquare;
                    if (square !== null) {
                        square.detectEdgeTouched(x, y);
                    }
                }
        
                if (square !== null) {
                    square.isTouched = true;
                    if (moving) {
                        var dx = x - startX;
                        var dy = y - startY;
                        Logger.debug("deltas: (" + dx + "," + dy + ")");
                        switch (square.getEdgeTouched()) {
                            // Resize square if edge touched
                            case Edge.Bottom:
                                square.setHeight(squareOriginalHeight + dy);
                                break;
                            case Edge.Right:
                                square.setWidth(squareOriginalWidth + dx);
                                break;
                            case Edge.Top:
                                square.setY1(squareStartY + dy);
                                square.setHeight(squareOriginalHeight - dy);
                                break;
                            case Edge.Left:
                                square.setX1(squareStartX + dx);
                                square.setWidth(squareOriginalWidth - dx);
                                break;
                            default:
                                // Move square
                                square.setX1(squareStartX + dx);
                                square.setY1(squareStartY + dy);
                                break;
                        }
                    }
                }
        
                canvas.update();
            };
        
            element.mousedown(downEvent);
            element.mouseup(upEvent);
            element.mousemove(moveEvent);
            element.bind("touchstart", downEvent);
            element.bind("touchend", upEvent);
            element.bind("touchmove", moveEvent);
        }
    };
}());