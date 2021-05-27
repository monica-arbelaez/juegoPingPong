
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
        //muesta si esta jugando
        this.playing = false;
    }

    //se modifica el protopito de la clase 
    self.Board.prototype = {
        // metodos para obtener los elementos-barras del juego
        get elements() {
            var elements = this.bars.map(function(bar) { return bar; });
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
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;  
        board.ball = this;
        this.kind = "circle";
    }
    //se le da movimiento a la pelota
    self.Ball.prototype = {
        move: function() {
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        },
        get width() {
            return this.radius *2;
        },
        get height() {
            return this.radius *2;
        },
        
        collision: function(bar) {
            //Reacciona a la colision con una barra que recibe 
            //como parámetro y calcula el angulo en que se va a mover la pelota
            var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if (this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;
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
//se dibujan los elementos en la vista por medio del vanvas
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
            if (this.board.playing) {
                //se limpia el tablero
                this.clean();
                //dibuja todos los elementos 
                this.draw();
                // chequea las coliciones 
                this.check_collisions();
                //mueve la pelota
                this.board.ball.move();
                
            }
        },
        check_collisions: function() {
            for (var i = this.board.bars.length - 1; i >= 0; i--) {
                var bar = this.board.bars[i];
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collision(bar);
                }
            };
        }  
    }
    
    function hit(a, b) {
        
        //Revisa si a colisiona con b
        var hit = false;
        //Colisiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //Colisiones de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Colisiones de b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }
        return hit;
    }
    //dibuja los elementos (barras, pelota) 
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
var bar = new Bar(20, 120, 10, 100, board);
var bar_2 = new Bar(770, 120, 10, 100, board);
var canvas = document.getElementById('canvas');
//se instancia un nuevo objeto de la clase BoardView
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);

//Evento que esta escuchando cuando  se preciona una tecla
document.addEventListener("keydown", function(ev) {
    if (ev.keyCode === 38) {
        ev.preventDefault();
        bar.up();
    } else if (ev.keyCode === 40) {
        ev.preventDefault();
        bar.down();
    } else if (ev.keyCode === 87) {
        ev.preventDefault();
        bar_2.up();
    } else if (ev.keyCode === 83) {
        ev.preventDefault();
        bar_2.down();
    } else if (ev.keyCode === 32) {
        ev.preventDefault();
        board.playing = !board.playing;
    }
});
board_view.draw();

//animacion de la barra
window.requestAnimationFrame(controller);

//---------El controlador------------------- 
function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}