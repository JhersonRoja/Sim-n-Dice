let moves, totalMoves;

function illuminate(cellPos, time) {
    setTimeout(() => {
     document.querySelector('.cell[pos="' + cellPos +'"]').classList.add('active');
       setTimeout(() => {
         document.querySelector('.cell[pos="' + cellPos +'"]').classList.remove('active');
        }, 300);
    }, time);
}

function setMoves (current) {
    moves.push(Math.floor(Math.random() * 4) + 1);
    if(current < totalMoves) {
        setMoves(++current);
    }
}


function startGame () {
    moves = [];
    totalMoves = 2;
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#mensage').style.display = 'block';
    sequence();
}

function sequence () {
    moves = [];
    setMoves(1);
    document.querySelector('#mensage').innerHTML = 'Simon Dice';

    for(let i = 0; i < moves.length; i++) {
        illuminate(moves[i], 600 * i);
    }

    setTimeout(() => {
        document.querySelector('#mensage').innerHTML = 'Replique La Secuencia'
    }, 600 * moves.length);
}



function cellClick(e) {
    let cellpos = e.target.getAttribute('pos');
    illuminate(cellpos, 0);

    if(moves && moves.length) {
        if(moves[0] == cellpos) {
            moves.shift();

            if(!moves.length) {
                totalMoves++;
                setTimeout(() => {
                    sequence();
                }, 1000);
            }
        }
        else {
            document.querySelector('#mensage').innerHTML = 'GAME OVER'
            setTimeout(() => {
                document.querySelector('#start').style.display = 'block'
                document.querySelector('#mensage').style.display = 'none'
            }, 1000);
        }
    }
}

document.querySelector('#start').addEventListener('click', startGame);
let cells = Array.from(document.getElementsByClassName('cell'));

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
})