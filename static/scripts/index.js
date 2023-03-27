'use strict'
import {Pawn, Rook, Bishop, Queen, King, Knight} from "./Pieces.js"

let currentId = null;
let currentColor = null;
let clickedPieceXY = null;
let currentPiece = null;

function AddPiece(piece, x, y, type) {
    let img;
    img = document.createElement('img');
    img.src = piece.img;
    img.id = type;
    img.className = piece.CN;
    let emplacement = document.getElementById(`${x}${y}`);
    emplacement.append(img);
}

function RemovePiece(piece_id) {
    document.getElementById(piece_id).children[0].remove();
}

function MovePiece(e, c) {
    switch (currentPiece) {
        case "Pawn":
            AddPiece(new Pawn(c), e.target.id[0], e.target.id[1], currentId);
            break;
        case "King":
            AddPiece(new King(c), e.target.id[0], e.target.id[1], currentId);
            break;
        case "Knight":
            AddPiece(new Knight(c), e.target.id[0], e.target.id[1], currentId);
            break;
        case "Queen":
            AddPiece(new Queen(c), e.target.id[0], e.target.id[1], currentId);
            break;
        case "Rook":
            AddPiece(new Rook(c), e.target.id[0], e.target.id[1], currentId);
            break;
        case "Bishop":
            AddPiece(new Bishop(c), e.target.id[0], e.target.id[1], currentId);
            break;
    }
    RemovePiece(clickedPieceXY)

}

function AddStartingPieces() {
    let rook1 = new Rook(1);
    let rook2 = new Rook(1);
    let knight1 = new Knight(1);
    let knight2 = new Knight(1);
    let bishop1 = new Bishop(1);
    let bishop2 = new Bishop(1);
    let queen = new Queen(1);
    let king = new King(1);
    AddPiece(rook1, 1, 1, "rook_1_b");
    AddPiece(rook2, 8, 1, "rook_2_b");
    AddPiece(knight1, 2, 1, "knight_1_b");
    AddPiece(knight2, 7, 1, "knight_2_b");
    AddPiece(bishop1, 3, 1, "bishop_1_b");
    AddPiece(bishop2, 6, 1, "bishop_2_b");
    AddPiece(queen, 4, 1, "queen_b");
    AddPiece(king, 5, 1, "king_b");

    for (let i = 0; i < 8; i++) {
        AddPiece(new Pawn(1), i + 1, 2, `pawn_${i}_b`);
        AddPiece(new Pawn(0), i + 1, 7, `pawn_${i}_w`);
    }
    let rook1_w = new Rook(0);
    let rook2_w = new Rook(0);
    let knight1_w = new Knight(0);
    let knight2_w = new Knight(0);
    let bishop1_w = new Bishop(0);
    let bishop2_w = new Bishop(0);
    let queen_w = new Queen(0);
    let king_w = new King(0);
    AddPiece(rook1_w, 1, 8, "rook_1_w");
    AddPiece(rook2_w, 8, 8, "rook_2_w");
    AddPiece(knight1_w, 2, 8, "knight_1_w");
    AddPiece(knight2_w, 7, 8, "knight_2_w");
    AddPiece(bishop1_w, 3, 8, "bishop_1_w");
    AddPiece(bishop2_w, 6, 8, "bishop_2_w");
    AddPiece(queen_w, 4, 8, "queen_w");
    AddPiece(king_w, 5, 8, "king_w");
}

AddStartingPieces();

function GetPiece(e) {
    let _id = e.target.id;
    if (_id.substring(_id.length - 1) === "w") {
        currentColor = 0;
    } else if (_id.substring(_id.length - 1) === "b") {
        currentColor = 1
    }
    let pieceNumber = _id.substring(
        e.target.id.indexOf("_") + 1,
        e.target.id.lastIndexOf("_")
    )

    if (e.target.tagName == "IMG") {
        currentId = e.target.id;
        clickedPieceXY = e.target.parentNode.id;
        currentPiece = e.target.className;
    } else if (clickedPieceXY != null && currentColor != null) {
        MovePiece(e, currentColor);
        clickedPieceXY = null;
        currentPiece = null;
        currentColor = null;
    }
}


board.addEventListener('click', GetPiece, true)