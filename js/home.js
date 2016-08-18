var Home = (function() {
    var canvas = new CanvasModel();
    $(document).ready(function() {
        SquareEventBinder.setupEvents($("#square_container"), canvas);
    });

    return {
        btnCreateSquareClick: function() {
            var parameter = $("#txt_parameter").val();
            var squareType = $("#ddl_square_type").find(":selected").val();
            canvas.addSquare(parameter, squareType);
        },
        txtParameterKeyUp: function() {
            if (event.keyCode == 13) {
                this.btnCreateSquareClick();
            }
        }
    };
}());