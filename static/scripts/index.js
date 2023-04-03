'use strict'
import { Pawn, Rook, Bishop, Queen, King, Knight } from "./Pieces.js"

let teamBlack = [];
let teamWhite = [];

let currentColor = null;
let currentPiece = null;


function AddPiece(piece, x, y, type) {
    let img;
    img = document.createElement('img');
    img.src = piece.img;
    img.id = type;
    piece.id = type;
    img.className = type;
    let emplacement = document.getElementById(`${x}${y}`);
    emplacement.append(img);
    if (piece.color === 1) {
        teamBlack.push(piece);
    }
    else {
        teamWhite.push(piece);
    }
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

    let position = e.target.parentElement.id;
    if (e.target.tagName === "IMG") {
        currentColor = String(e.target.id).split("_")[2];
    }
    if (currentColor === "b") {
        for (let i = 0; i < teamBlack.length; i++) {
            if (e.target.id === teamBlack[i].id) {
                currentPiece = teamBlack[i];
                GetPossibleMoves(currentPiece, position);
            }
        }
    }
    else if (currentColor === "w") {
        for (let i = 0; i < teamWhite.length; i++) {
            if (e.target.id === teamWhite[i].id) {
                currentPiece = teamWhite[i];
                GetPossibleMoves(currentPiece, position);
            }
        }
    }
    if (e.target.classList.contains('possibleMove')) {
        movePiece(e);
    }
}
function GetDiagonal(piece) {
    let diagonalRight = null;
    let diagonalLeft = null;
    let number = Number(piece.position);
    let advanceNumber = 0;
    let diagonalMoves = [];
    if (piece.color === 1) {
        advanceNumber = 1;
    }
    else {
        advanceNumber = -1;
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
    return diagonalMoves;
}

function GetPossibleMoves(piece, position) {
    if (currentPiece !== null) {
        document.querySelectorAll('.possibleMove').forEach(e => e.classList.remove('possibleMove'));
    }
    else {
        return;
    }
    let moves = [];
    piece.position = position;
    console.log(piece);
    if (piece.type === "pawn") {
        currentPiece.GetPossibleMoves();
        for(let i = 0; i < piece.possible_moves.length; i++){
            document.getElementById(piece.possible_moves[i]).classList.add('possibleMove');
        }
    }
    //TODO: Rook : loop until it finds a piece or it reaches the end of the board
    if (piece.type === "rook") {
        let number = Number(piece.position);
        let i = 0;
        while (document.getElementById(number + i).childElementCount === 0) {
            moves.push(number + i);
            i++;
        }
    }

    for (let i = 0; i < moves.length; i++) {
        
        document.getElementById(piece.possible_moves[i]).classList.add('possibleMove');

    }
}

function movePiece(e) {
    if (e.target.classList.contains('possibleMove')) {
        document.getElementById(currentPiece.position).children[0].remove();
        currentPiece.position = e.target.id;
        console.log(currentPiece);
        let img = document.createElement('img');
        img.id = currentPiece.id;
        img.src = currentPiece.img;
        e.target.append(img);
        document.querySelectorAll('.possibleMove').forEach(e => e.classList.remove('possibleMove'));
    }
}

board.addEventListener('click', GetPiece, true);