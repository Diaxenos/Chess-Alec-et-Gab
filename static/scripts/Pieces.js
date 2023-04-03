'use strict'
const src_b = "/static/img/pieces_b/"
const src_w = "/static/img/pieces_w/"
export class Piece {
    color;
    type;
    possible_moves;
    img;
    position;
    has_moved;
    constructor(color){
        this.color = color;
    }
}
export class Pawn extends Piece{
    constructor(color, CN) {
        super(color, CN);
        if(color == 0){
            this.img = src_w + "pawn_w.png";
        }
        else{
            this.img = src_b + "pawn_b.png";
        }
        this.type = "pawn";
        this.has_moved = false;
    }
}
export class Bishop extends Piece{
    constructor(color) {
        super(color);
        if (color == 0){
            this.img = src_w + "bishop_w.png";
        }
        else {
            this.img = src_b + "bishop_b.png";
        }
        this.type = "bishop";
    }
}
export class Rook extends Piece{
    constructor(color) {
        super(color);
        if (color == 0){
            this.img = src_w + "rook_w.png";
        }
        else{
            this.img = src_b + "rook_b.png";
        }
        this.type = "rook"
    }
}
export class King extends Piece{
    constructor(color) {
        super(color);
        if (color == 0){
            this.img = src_w + "king_w.png";
        }
        else{
            this.img = src_b + "king_b.png";
        }
        this.type = "king";
    }
}
export class Knight extends Piece{
    constructor(color) {
        super(color);
        if (color == 0){
            this.img = src_w + "knight_w.png";
        }
        else{
            this.img = src_b + "knight_b.png";
        }
        this.type = "knight";
    }
}
export class Queen extends Piece{
    constructor(color) {
        super(color);
        if (color == 0){
            this.img = src_w + "queen_w.png";
        }
        else{
            this.img = src_b + "queen_b.png";
        }
        this.type = "queen";
    }
}