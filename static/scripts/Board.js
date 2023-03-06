const board = document.querySelector('.board');
const info = document.getElementById('info')
// add squares to the board

for(let i = 0; i < 8; i++){
    //each line
    const line = document.createElement('div');
    line.classList.add('line')
    line.id = i + 1;
    board.appendChild(line);
    for(let j = 0; j < 8; j++){
        const square = document.createElement('div');

        //each square of that line
        square.classList.add('square');
        if(i % 2 == 0 && j % 2 == 0){
            square.classList.add('light');
        }
        else if(i % 2 != 0 && j % 2 != 0){
            square.classList.add('light');
        }
        else{
            square.classList.add('dark');
        }
        square.position = `${j+1}${i+1}`
        square.id = `${j+1}${i+1}`
        line.appendChild(square);
    }
}