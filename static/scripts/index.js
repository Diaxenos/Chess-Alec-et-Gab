"use strict";
import { Pawn, Rook, Bishop, Queen, King, Knight } from "./Pieces.js";
import { Player } from "./player.js";
const gameOptions = document.querySelector('#game-options');
let time = 0;
let teamBlack = [];
let teamWhite = [];
let currentTeam = null;
let currentColor = null;
let currentPiece = null;
let playerColor = null;

function StartGame(e) {
  
  if(e.target.id !== "start"){
    return;
  }
  playerColor = document.querySelector('input[name="color"]:checked').value;

  console.log(playerColor);
  let player = new Player(Number(playerColor));
  console.log(player);
  gameOptions.style.display = "none";
  AddStartingPieces(player);

  startTimer(document.getElementById("timer_container"));
}

function AddPiece(piece, x, y, type) {
  let img;
  img = document.createElement("img");
  img.src = piece.img;
  img.id = type;
  piece.id = type;
  piece.position = Number(`${x}${y}`);
  img.className = type;
  let emplacement = document.getElementById(piece.position);
  emplacement.append(img);
  if (piece.color === 1) {
    teamBlack.push(piece);
  } else {
    teamWhite.push(piece);
  }
}

function AddStartingPiecesWhite() {
  currentTeam = teamWhite;
  currentColor = 0;
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
  AddPiece(queen, 4, 1, "queen_0_b");
  AddPiece(king, 5, 1, "king_0_b");

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
  AddPiece(queen_w, 4, 8, "queen_0_w");
  AddPiece(king_w, 5, 8, "king_0_w");
}

function AddStartingPiecesBlack() {
  currentTeam = teamBlack;
  currentColor = 1;
  let rook1 = new Rook(0);
  let rook2 = new Rook(0);
  let knight1 = new Knight(0);
  let knight2 = new Knight(0);
  let bishop1 = new Bishop(0);
  let bishop2 = new Bishop(0);
  let queen = new Queen(0);
  let king = new King(0);
  AddPiece(rook1, 1, 1, "rook_1_w");
  AddPiece(rook2, 8, 1, "rook_2_w");
  AddPiece(knight1, 2, 1, "knight_1_w");
  AddPiece(knight2, 7, 1, "knight_2_w");
  AddPiece(bishop1, 3, 1, "bishop_1_w");
  AddPiece(bishop2, 6, 1, "bishop_2_w");
  AddPiece(queen, 4, 1, "queen_w");
  AddPiece(king, 5, 1, "king_w");

  for (let i = 0; i < 8; i++) {
    AddPiece(new Pawn(0), i + 1, 2, `pawn_${i}_w`);
    AddPiece(new Pawn(1), i + 1, 7, `pawn_${i}_b`);
  }
  let rook1_w = new Rook(1);
  let rook2_w = new Rook(1);
  let knight1_w = new Knight(1);
  let knight2_w = new Knight(1);
  let bishop1_w = new Bishop(1);
  let bishop2_w = new Bishop(1);
  let queen_w = new Queen(1);
  let king_w = new King(1);
  AddPiece(rook1_w, 1, 8, "rook_1_b");
  AddPiece(rook2_w, 8, 8, "rook_2_b");
  AddPiece(knight1_w, 2, 8, "knight_1_b");
  AddPiece(knight2_w, 7, 8, "knight_2_b");
  AddPiece(bishop1_w, 3, 8, "bishop_1_b");
  AddPiece(bishop2_w, 6, 8, "bishop_2_b");
  AddPiece(queen_w, 4, 8, "queen_b");
  AddPiece(king_w, 5, 8, "king_b");
}
function AddStartingPieces(player) {
  console.log(player.color);
  if(player.color === 0){
    AddStartingPiecesWhite();
  }
  else{
    AddStartingPiecesBlack();
  }
};
function UpdatePositions(team) {
  team.forEach(piece => {
    if(document.getElementById(piece.id) !== null){
      piece.position = Number(document.getElementById(piece.id).parentElement.id);
    }
  });
}

function kill(piece){
  for(let i = 0; i < teamBlack.length; i++){
    if(teamBlack[i].id === piece.id){
      teamBlack.splice(i, 1);
    }
  }
  for(let i = 0; i < teamWhite.length; i++){
    if(teamWhite[i].id === piece.id){
      teamWhite.splice(i, 1);
    }
  }
}

function GetPiece(e) {
  if(playerColor === "0"){
    currentColor = "w";
  }else{
    currentColor = "b";
  }

  if(currentPiece !== null && currentPiece.id !== e.target.id){
    document.querySelectorAll(".possible_move").forEach((element) => {
      element.classList.remove("possible_move");
    });
    if(e.target.id.split("_")[2] === currentColor || e.target.id.split("_")[1] === currentColor){
      if (currentColor === "b") {
        currentTeam = teamBlack;
        for (let i = 0; i < teamBlack.length; i++) {
          if (e.target.id === teamBlack[i].id) {
            currentPiece = teamBlack[i];
          }
        }
      } else if (currentColor === "w") {
        currentTeam = teamWhite;
        for (let i = 0; i < teamWhite.length; i++) {
          if (e.target.id === teamWhite[i].id) {
            currentPiece = teamWhite[i];
          }
        }
      }
    }
  }
  else if (e.target.tagName === "IMG") {
    if (currentColor === "b") {
      currentTeam = teamBlack;
      for (let i = 0; i < teamBlack.length; i++) {
        if (e.target.id === teamBlack[i].id) {
          currentPiece = teamBlack[i];
        }
      }
    } else if (currentColor === "w") {
      currentTeam = teamWhite;
      for (let i = 0; i < teamWhite.length; i++) {
        if (e.target.id === teamWhite[i].id) {
          currentPiece = teamWhite[i];
        }
      }
    }
  }
  console.log(currentPiece);
  currentPiece.GetPossibleMoves();
  if (
    e.target.classList.contains("possible_move") ||
    e.target.parentElement.classList.contains("possible_move")
  ) {
    movePiece(e);
  }
}

function movePiece(e) {
  let movedImg = document.createElement("img");
  movedImg.src = currentPiece.img;
  movedImg.id = currentPiece.id;
  movedImg.className = currentPiece.id;

  if (
    e.target.parentElement.classList.contains("possible_move") &&
    String(e.target.id).split("_")[2] !== currentColor
  ) {
    let newPosition = Number(e.target.parentElement.id);
    kill(e.target);
    e.target.remove()
    document.getElementById(currentPiece.position).firstChild.remove();
    currentPiece.hasMoved = true;
    document.getElementById(newPosition).append(movedImg);
    currentPiece.position = Number(e.target.id);
    currentPiece = null;
  } else if (e.target.classList.contains("possible_move")) {
    console.log(e.target);
    document.getElementById(currentPiece.position).firstChild.remove();
    console.log("POSITION:" + currentPiece.position);
    currentPiece.position = Number(e.target.id);
    currentPiece.hasMoved = true;
    e.target.append(movedImg);
    currentPiece = null;
  }
  document.querySelectorAll(".possible_move").forEach((element) => {
    element.classList.remove("possible_move");
  });
  UpdatePositions(currentTeam);
}

function startTimer(t){

  let seconds = document.createElement("p");
  let minutes = document.createElement("p");
  let divider = document.createElement("p");
  divider.innerHTML = ":";
  minutes.id = "minutes";
  seconds.id = "seconds";
  t.append(minutes);
  t.append(divider);
  t.append(seconds);
  t.style.display = "flex";
  seconds = 1;
  minutes = 10;
  setInterval(() => {
    if(seconds === 0){
      minutes--;
      seconds = 60;
    }
    seconds--;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("minutes").innerHTML = minutes;
  }, 1000);
}

gameOptions.addEventListener("click", StartGame, true);
board.addEventListener("click", GetPiece, true);
