
(function() {
    self.Board = function(width, height) {
        //se crea el constructor del juego 
        //Ancho del tablero
        this.width = width;
        //Alto del tablero
        this.height = height;
        // estan jugando
        this.playing=false;
        //alguien perdio 
        this.game.over= false;
        //Las barras laterales del juego
        this.bars = [];
        //La pelota del juego
        this.ball = null;
    }
    //se modifica el protopito de la clase 
    self.Board.prototype= {
        // metodos para obtener los elementos-barras del jurgo
        get elements(){
            let element= this.bars;
            element.push(ball);
            return elements;
        }
    }  
})();

//se dibujan los elementos en la vista
(function(){
    self.BoardView= function(canvas, board){
        this.canvas= canvas;
        //modifican el alto y el ancho del tablero
        this.canvas.width=board.width;
        this.canvas.height=board.height;
        this.board= board;
        //objeto a traves del cual se peude dibujar en Js
        this.ctx=canvas.getContext("2d");

    }
})();
self.addEventListener("load", main);
function main(){
    //se instancia un nuevo objeto de la clase Boar
    console.log("hola mundo");
    var board = new Board(800,400);
    let canvas = document.getElementById('canvas')
    //se instancia un nuevo objeto de la clase BoardView
    let board_view=new BoardView(canvas,board);
}