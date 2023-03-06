'use strict'
const src_b = "/static/img/pieces_b/"
const src_w = "/static/img/pieces_w/"
export class Piece {
    color;
    allowed_directions;
    max_distance;
    img;
    CN;
    constructor(color){
        this.color = color;
    }
}
export class Pawn extends Piece{
    constructor(color) {
        super(color);
        if(color == 0){
            this.img = src_w + "pawn_w.png";
        }
        else{
            this.img = src_b + "pawn_b.png";
        }
        this.CN = "Pawn";
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
        this.CN = "Bishop";
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
        this.CN = "Rook"
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
        this.CN = "King";
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
        this.CN = "Knight";
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
        this.CN = "Queen";
    }
}