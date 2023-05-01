'use strict'
import {Piece, Pawn, Rook, Bishop, Queen, King, Knight} from "./Pieces.js"

export class Player{
    pieces_left;
    color;
    
    constructor(c) {
        this.color = c;
    }
}