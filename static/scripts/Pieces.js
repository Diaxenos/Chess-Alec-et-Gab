"use strict";
const src_b = "/static/img/pieces_b/";
const src_w = "/static/img/pieces_w/";

export class Piece {
  color;
  type;
  possible_moves = [];
  img;
  position;
  hasMoved;
  constructor(color) {
    this.color = color;
  }

  GetColor() {
    if (this.color === 0) return "w";
    else if (this.color === 1) return "b";
  }
  HilightPossibleMoves() {
    try {
      for (const e of this.possible_moves) {
        let current = document.getElementById(e);
        if (current !== null && current.className !== "Line") {
          if (current.childElementCount == 0) {
            current.classList.add("possible_move");
          } else if (
            current.children[0].id.split("_")[2] !== this.GetColor() &&
            current.childElementCount == 1
          ) {
            current.classList.add("possible_move");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export class Pawn extends Piece {
  constructor(color, CN) {
    super(color, CN);
    if (color == 0) {
      this.img = src_w + "pawn_w.png";
    } else {
      this.img = src_b + "pawn_b.png";
    }
    this.type = "pawn";
    this.hasMoved = false;
  }

  GetPossibleMoves() {
    //on se revoit le 24

    let blocked = false;
    let currentColor = null;
    let diagonalMoves = [];
    let diagonalLeft = null;
    let diagonalRight = null;
    let possMoves = [];
    let advanceNumber = 0;
    if (this.color == 0) {
      advanceNumber -= 1;
      currentColor = "w";
    } else {
      advanceNumber += 1;
      currentColor = "b";
    }
    try {
      diagonalRight = document.getElementById(
        this.position + 10 + advanceNumber
      );
    } catch (error) {
      console.log("diagonal empty");
    }
    try {
      diagonalLeft = document.getElementById(
        this.position - 10 + advanceNumber
      );
    } catch (error) {
      console.log("diagonal empty");
    }
    try {
      if (diagonalRight !== null) {
        if (
          diagonalRight.childElementCount != 0 &&
          diagonalRight.children[0].id.split("_")[2] !== currentColor
        ) {
          diagonalMoves.push(diagonalRight.id);
        }
      }
      if (diagonalLeft !== null) {
        if (
          diagonalLeft.childElementCount != 0 &&
          diagonalLeft.children[0].id.split("_")[2] !== currentColor
        ) {
          diagonalMoves.push(diagonalLeft.id);
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (
      document.getElementById(this.position + advanceNumber).childNodes
        .length != 0
    ) {
      console.log("blocked");
      blocked = true;
    } else {
      possMoves.push(this.position + advanceNumber);
    }
    if (
      (!this.hasMoved &&
        !document.getElementById(this.position + advanceNumber * 2)
          .hasChildNodes) ||
      document.getElementById(this.position + advanceNumber).childNodes
        .length != 0
    ) {
      console.log("blocked");
      blocked = true;
    } else if (!this.hasMoved) {
      possMoves.push(this.position + advanceNumber * 2);
    }
    for (let i = 0; i < diagonalMoves.length; i++) {
      possMoves.push(diagonalMoves[i]);
    }
    this.possible_moves = possMoves;
    this.HilightPossibleMoves();
  }
}
export class Bishop extends Piece {
  constructor(color) {
    super(color);
    if (color == 0) {
      this.img = src_w + "bishop_w.png";
    } else {
      this.img = src_b + "bishop_b.png";
    }
    this.type = "bishop";
  }

  AssertPossibleMove(move) {
    let current = document.getElementById(move);
    if (current !== null && current.className !== "Line") {
      if (current.childElementCount == 0) {
        return true;
      } else if (
        current.children[0].id.split("_")[2] !== this.GetColor() &&
        current.childElementCount == 1
      ) {
        return true;
      }
    }
    return false;
  }
  GetPossibleMoves() {
    let possMoves = [];
    let i = 11;
    let max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 11;
      } else {
        max = true;
      }
    }
    i = 9;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 9;
      } else {
        max = true;
      }
    }
    i = -11;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 11;
      } else {
        max = true;
      }
    }
    i = -9;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 9;
      } else {
        max = true;
      }
    }
    this.possible_moves = possMoves;
    this.HilightPossibleMoves();
  }
}
export class Rook extends Piece {
  constructor(color) {
    super(color);
    if (color == 0) {
      this.img = src_w + "rook_w.png";
    } else {
      this.img = src_b + "rook_b.png";
    }
    this.type = "rook";
  }
  AssertPossibleMove(move) {
    let current = document.getElementById(move);
    if (current !== null && current.className !== "Line") {
      if (current.childElementCount == 0) {
        return true;
      } else if (
        current.children[0].id.split("_")[2] !== this.GetColor() &&
        current.childElementCount == 1
      ) {
        return true;
      }
    }
    return false;
  }
  GetPossibleMoves() {
    let possMoves = [];
    let i = 10;
    let max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 10;
      } else {
        max = true;
      }
    }
    i = -10;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 10;
      } else {
        max = true;
      }
    }
    i = 1;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 1;
      } else {
        max = true;
      }
    }
    i = -1;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 1;
      } else {
        max = true;
      }
    }
    this.possible_moves = possMoves;
    this.HilightPossibleMoves();
  }
}
export class King extends Piece {
  constructor(color) {
    super(color);
    if (color == 0) {
      this.img = src_w + "king_w.png";
    } else {
      this.img = src_b + "king_b.png";
    }
    this.type = "king";
  }
  AssertPossibleMove(move) {
    let current = document.getElementById(move);
    if (current !== null && current.className !== "Line") {
      if (current.childElementCount == 0) {
        return true;
      } else if (
        current.children[0].id.split("_")[1] !== this.GetColor() &&
        current.childElementCount == 1
      ) {
        return true;
      }
    }
    return false;
  }
  GetPossibleMoves() {
    let possMoves = [];
    possMoves.push(this.position + 1);
    possMoves.push(this.position - 1);
    possMoves.push(this.position + 10);
    possMoves.push(this.position - 10);
    possMoves.push(this.position + 11);
    possMoves.push(this.position + 9);
    possMoves.push(this.position - 11);
    possMoves.push(this.position - 9);
    this.possible_moves = possMoves;
    this.HilightPossibleMoves();
  }
}
export class Knight extends Piece {
  constructor(color) {
    super(color);
    if (color == 0) {
      this.img = src_w + "knight_w.png";
    } else {
      this.img = src_b + "knight_b.png";
    }
    this.type = "knight";
  }
  GetPossibleMoves() {
    let possMoves = [];
    possMoves.push(this.position + 21);
    possMoves.push(this.position + 19);
    possMoves.push(this.position + 12);
    possMoves.push(this.position + 8);
    possMoves.push(this.position - 21);
    possMoves.push(this.position - 19);
    possMoves.push(this.position - 12);
    possMoves.push(this.position - 8);
    this.possible_moves = possMoves;
    this.HilightPossibleMoves();
  }
}
export class Queen extends Piece {
  constructor(color) {
    super(color);
    if (color == 0) {
      this.img = src_w + "queen_w.png";
    } else {
      this.img = src_b + "queen_b.png";
    }
    this.type = "queen";
  }
  AssertPossibleMove(move) {
    let current = document.getElementById(move);
    if (current !== null && current.className !== "Line") {
      if (current.childElementCount == 0) {
        return true;
      } else if (
        this.position.children[0].id.split("_")[1] !== this.GetColor() &&
        current.childElementCount == 1
      ) {
        return true;
      }
    }
    return false;
  }
  GetPossibleMoves() {
    let possMoves = [];
    let i = 10;
    let max = false;
    console.log(document.getElementById(this.position).children[0].id.split("_")[1]);
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 10;
      } else {
        max = true;
      }
    }
    i = -10;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 10;
      } else {
        max = true;
      }
    }
    i = 1;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 1;
      } else {
        max = true;
      }
    }
    i = -1;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i -= 1;
      } else {
        max = true;
      }
    }
    i = 11;
    max = false;
    while (!max) {
      if (this.AssertPossibleMove(this.position + i)) {
        possMoves.push(this.position + i);
        try {
          if (document.getElementById(this.position + i).childElementCount == 1)
            max = true;
        } catch (error) {
          console.log(error);
        }
        i += 11;
      } else {
        max = true;
      }
    }
    i = -11;
    max = false;
    this.HilightPossibleMoves();
  }
}
