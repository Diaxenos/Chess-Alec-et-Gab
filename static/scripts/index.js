'use strict'
import {Piece, Pawn, Rook, Bishop, Queen, King, Knight} from "./Pieces.js"
let clickedPiece = null;
let clickedPieceXY = null;
function AddPiece(piece, x, y, type){
    let img;
    img = document.createElement('img');
    img.src = piece.img;
    img.id = type;
    img.className = piece.CN;
    let emplacement = document.getElementById(`${x}${y}`);
    emplacement.append(img);
}
function AddStartingPieces(){
    AddPiece(new Rook(1), 1, 1, "rook1_b");
    AddPiece(new Rook(1), 8, 1, "rook2_b");
    AddPiece(new Knight(1), 2, 1, "knight1_b");
    AddPiece(new Knight(1), 7, 1, "knight2_b");
    AddPiece(new Bishop(1), 3, 1, "bishop1_b");
    AddPiece(new Bishop(1), 6, 1, "bishop2_b");
    AddPiece(new Queen(1), 4, 1, "queen_b");
    AddPiece(new King(1), 5, 1, "king_b");

    for (let i = 0; i < 8; i++) {
        AddPiece(new Pawn(1), i + 1, 2, `pawn_${i}_b`);
        AddPiece(new Pawn(0), i + 1, 7, `pawn_${i}_w`);
    }
    AddPiece(new Rook(0), 1, 8, "rook1_w");
    AddPiece(new Rook(0), 8, 8, "rook2_w");
    AddPiece(new Knight(0), 2, 8, "knight1_w");
    AddPiece(new Knight(0), 7, 8, "knight2_w");
    AddPiece(new Bishop(0), 3, 8, "bishop1_w");
    AddPiece(new Bishop(0), 6, 8, "bishop2_w");
    AddPiece(new Queen(0), 4, 8, "queen_w");
    AddPiece(new King(0), 5, 8, "king_w");
}
AddStartingPieces();

function MovePiece(e){
    if(e.target.tagName == 'IMG'){
        clickedPiece = e.target;
        clickedPieceXY = e.target.parentElement.id;
        console.log(e.target.tagName);
    }
    else if(clickedPieceXY != null && e.target.id != null){
        console.log("test");
        if(clickedPiece.className == "Pawn"){
            let color = null;
            if(e.target.classList.contains("_w")){
                color = 0;
            }
            else if(e.target.classList.contains("_b")){
                color = 1;
            }
            AddPiece(new Pawn(color), clickedPieceXY[0], clickedPieceXY[1], e.target.className.toString())

        clickedPieceXY = e.target.id;
        }
    }
}

board.addEventListener('click', MovePiece, true)