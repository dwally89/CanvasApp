var Home = (function() {
    var canvas = new CanvasModel();
    $(document).ready(function() {
        SquareEventBinder.setupEvents($("#square_container"), canvas);
    });

    return {
        btnCreateSquareClick: function() {
            canvas.addSquare($("#txt_colour").val());
        },
        txtColourKeyUp: function() {
            if (event.keyCode == 13) {
                this.btnCreateSquareClick();
            }
        }
    };
}());