'use strict'
const src_b = "/static/img/pieces_b/"
const src_w = "/static/img/pieces_w/"

export class Piece {
    color;
    type;
    possible_moves = [];
    img;
    position;
    has_moved;
    constructor(color) {
        this.color = color;
    }
}
export class Pawn extends Piece {
    constructor(color, CN) {
        super(color, CN);
        if (color == 0) {
            this.img = src_w + "pawn_w.png";
        }
        else {
            this.img = src_b + "pawn_b.png";
        }
        this.type = "pawn";
        this.has_moved = false;
    }

    GetPossibleMoves() {
        let number = Number(this.position);
        let diagonalMoves = [];
        let diagonalLeft = null;
        let diagonalRight = null;
        if (this.color === 1 && document.getElementById(number + 1).childElementCount === 0) {
            number += 1;
        }
        else if (this.color === 0 && document.getElementById(number - 1).childElementCount === 0) {
            number -= 1;
        }
        try {
            diagonalRight = document.getElementById(number + advanceNumber).nextElementSibling;
            console.log(diagonalRight);
        } catch (error) {
            console.log('diagonal out of range')
        }
        try {
            diagonalLeft = document.getElementById(number + advanceNumber).previousElementSibling;
            console.log(diagonalLeft);
        } catch (error) {
            console.log('diagonal out of range')
        }
        try {
            if (diagonalRight !== null) {
                if (diagonalRight.childElementCount != 0 && diagonalRight.children[0].id.split("_")[2] !== currentColor) {
                    diagonalMoves.push(diagonalRight.id);
                }
            }
            if (diagonalLeft !== null) {
                if (diagonalLeft.childElementCount != 0 && diagonalLeft.children[0].id.split("_")[2] !== currentColor) {
                    diagonalMoves.push(diagonalLeft.id);
                }
            }
        }
        catch(error) {
            console.log(error);
        }
        this.possible_moves.push(number);
        this.possible_moves.push(diagonalMoves);
    }

}
export class Bishop extends Piece {
    constructor(color) {
        super(color);
        if (color == 0) {
            this.img = src_w + "bishop_w.png";
        }
        else {
            this.img = src_b + "bishop_b.png";
        }
        this.type = "bishop";
    }
}
export class Rook extends Piece {
    constructor(color) {
        super(color);
        if (color == 0) {
            this.img = src_w + "rook_w.png";
        }
        else {
            this.img = src_b + "rook_b.png";
        }
        this.type = "rook"
    }
}
export class King extends Piece {
    constructor(color) {
        super(color);
        if (color == 0) {
            this.img = src_w + "king_w.png";
        }
        else {
            this.img = src_b + "king_b.png";
        }
        this.type = "king";
    }
}
export class Knight extends Piece {
    constructor(color) {
        super(color);
        if (color == 0) {
            this.img = src_w + "knight_w.png";
        }
        else {
            this.img = src_b + "knight_b.png";
        }
        this.type = "knight";
    }
}
export class Queen extends Piece {
    constructor(color) {
        super(color);
        if (color == 0) {
            this.img = src_w + "queen_w.png";
        }
        else {
            this.img = src_b + "queen_b.png";
        }
        this.type = "queen";
    }
}