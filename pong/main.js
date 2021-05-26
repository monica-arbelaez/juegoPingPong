
(function() {
    //----------------El modelo--------------------------
    self.Board = function(width, height) {
        //se crea el constructor del juego 
        //Ancho del tablero
        this.width = width;
        //Alto del tablero
        this.height = height;
        // estan jugando
        this.playing = false;
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
// Se cre la funcion de pelota
(function() {
    self.Ball = function(x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speed_y = 0;
        this.speed_x = 3;    

        board.ball = this;
        this.kind = "circle";
    }
});
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
    self.Bar.prototype = {
        //se le da movimiento a las barras
        down: function() {
            this.y += this.speed;
        },
        up: function() {
            this.y -= this.speed;
        },
        toString: function() {
            return "x:" + this.x + "y:" + this.y;
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
        clean: function() {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        },
        draw: function() {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);
            };
        },
        //se encarga que el juego funciones
        play: function(){
            //se limpia el tablero
            this.clean();
            //dibuja todos los elementos 
            this.draw()
        }  
    }
    //dibuja los elementos (barras) 
    function draw(ctx, element) {
        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }
})();
//se crea un objeto Tablero
var board = new Board(800,400);
//se inicializan la barras
var bar = new Bar(20, 100, 10, 100, board);
var bar_2 = new Bar(700, 100, 10, 100, board);
var canvas = document.getElementById('canvas');
//se instancia un nuevo objeto de la clase BoardView
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100,10, board);

//Evento que esta escuchando cuando cuando se preciona una tecla
document.addEventListener("keydown", function(ev) {
    console.log(ev.keyCode);
    if (ev.keyCode === 87) {
        ev.preventDefault();
        bar.up();
    } else if (ev.keyCode === 83) {
        bar.down();
    }else if (ev.keyCode === 38) {
        bar_2.up();
    } else if (ev.keyCode === 40) {
        bar_2.down();
    }
});

//animacion de la barra
window.requestAnimationFrame(controller);
//---------El controlador------------------- 
function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}