'use strict'
import {Piece, Pawn, Rook, Bishop, Queen, King, Knight} from "./Pieces.js"

export class Player{
    pieces_left;
    player_color;

    constructor(player_color) {
        this.player_color = player_color;
    }
}