var CanvasModel = function() {
    var squares = [];
    var drawer = new CanvasDrawer();
    return {
        addSquare: function(colour) {
            var square = null;
            var closeSquare = new CloseSquare(25, 25, "orange");
            if (drawer.verifyColour(colour)) {
                square = new ColourSquare(
                    100,
                    100,
                    closeSquare,
                    colour);
            }
            else if (colour === "bunny") {
                square = new ImageSquare(
                    100,
                    100,
                    closeSquare,
                    "https://static-s.aa-cdn.net/img/gp/20600003844258/ZPZU6Ppsd4z1x4SOzP7P5O3KWe3LtoX4v_ZAyxbIHLEZMKJbiAih229_pSow783DSGw=w300?v=1");
            }
            else {
                alert("Invalid colour");
                return;
            }

            square.setX(Math.floor(Math.random() * 800));
            square.setY(Math.floor(Math.random() * 600));
            
            
            drawer.addSquare(square);
            squares.push(closeSquare);
            squares.push(square);
            this.update();
        },
        deleteSquare: function(square) {
            var squareToRemove = square;
            while (squareToRemove !== null){
                Utils.deleteFromArray(squares, squareToRemove);
                drawer.deleteSquare(squareToRemove);
                squareToRemove = squareToRemove.getCloseSquare();
            }
        },
        findSquare: function(x, y) {
            for (var i = 0; i < squares.length; i++) {
                var square = squares[i];
                if (square.containsPoint(x, y)) {
                    var closeSquare = square.getCloseSquare();
                    if (closeSquare !== null && closeSquare.containsPoint(x, y)) {
                        Logger.debug("Found close square");
                        return closeSquare;
                    } else {
                        Logger.debug("Found square");
                        return square;
                    }
                }
            }

            Logger.debug("Didn't find square");
            return null;
        },
        update: function() {
            drawer.draw();
        }
    };
};