
(function() {
    //----------------El modelo--------------------------
    self.Board = function(width, height) {
        //se crea el constructor del juego 
        //Ancho del tablero
        this.width = width;
        //Alto del tablero
        this.height = height;
        // estan jugando
        this.playing=false;
        //Las barras laterales del juego
        this.bars = [];
        //La pelota del juego
        this.ball = null;
    }
    //se modifica el protopito de la clase 
    self.Board.prototype = {
        // metodos para obtener los elementos-barras del juego
        get elements() {
            var elements = this.bars;
            //Se agrega una pelota
            elements.push(this.ball);
            return elements;
        }
    }  
})();
// se crean el constructor de la barra y la dibuja
(function() {
    self.Bar = function(x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //se accede al board y a bars y le agrego un  nuevo elemento(barra)
        this.board.bars.push(this);
        //se dibuja la figura
        this.kind = "rectangle";
        this.speed = 10;
    }

    // se dibujan los elementos(barras y pelota) 
    self.Board.prototype = {
        //se le da movimiento a las barras
        bown: function(){
          this.y+=this.speed  
        },
        up: function(){
          this.y-= this.speed;
        },
        toString: function(){
            return"x: "+this.x +"y: "+this.y;
        }
    }
})();


//-------------------La vista---------------------------------
//se dibujan los elementos en la vista
(function() {
    self.BoardView = function(canvas, board) {
        this.canvas = canvas;
        //modifican el alto y el ancho del tablero
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        //objeto a traves del cual se peude dibujar en Js
        this.ctx = canvas.getContext("2d");
    }
    //Se modifica el prototype 
    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);
            };
        } 
    }
    //dibuja los elementos (barras) 
    function draw(ctx, element){
        if(element !== null && element.hasOwnProperty("kind")){
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;;
            } 
        }
    }
})();
//se instancia un nuevo objeto de la clase Tablero
var board = new Board(800,400);
//se inicializan la barras
var bar = new Bar(20,100,40,100, board);
var bar = new Bar(700,100,40,100, board);
var canvas = document.getElementById('canvas');
//se instancia un nuevo objeto de la clase BoardView
var board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function(ev){
    console.log(ev.keyCode);
    if(encodeURI.keyCode==38){
        bar.up();
    }
    else if(ev.keyCode==40){
        bar.down()
    }
    console.log(bar.toString());
});
self.addEventListener("load", main);

//---------El controlador------------------- 
function main(){
    //dibuja todos los elementos
    console.log(board); 
    board_view.draw();
}