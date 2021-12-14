
let array;
let sizeOfGrid = 6;
let clicked = false;
function gridSize(size) {
    sizeOfGrid = size.value;
    sizeOfGrid = parseInt(sizeOfGrid);

}
let speedOfGame = 500;
function speed(time) {
    speedOfGame = time.value;
    speedOfGame = parseInt(speedOfGame);
    console.log(speedOfGame)
}



function populateGridIinitalzation(sizeOfGrid, ROWS) {

    for (let i = 0; i < ROWS.length; i++) {
        ROWS[i] = new Array(sizeOfGrid);
        for (let j = 0; j < ROWS[i].length; j++) {
            ROWS[i][j] = Math.floor(Math.random() * 2);
        }

    }
    return ROWS;
}




function showGrid(array) {
    //console.log(array)
    if (document.getElementById("table__game")) {
        document.getElementById("table__game").remove();
    }

    let container = document.getElementById("main");

    let table = document.createElement("table");
    table.setAttribute('id', 'table__game');
    container.appendChild(table);



    array.map(i => {
        let row = document.createElement('tr');
        table.append(row);
        i.map(j => {
            let column = document.createElement('td');

            column.style.backgroundColor = j == 1 ? 'black' : 'white';
            row.appendChild(column);
        })
    })



}

document.getElementById('start').addEventListener('click', () => {
 
    if (clicked) {
        return;
    }
    else {
        clicked=true;
        const ROWS = Array(sizeOfGrid);
        console.log(ROWS)
        array = populateGridIinitalzation(sizeOfGrid, ROWS)

        showGrid(array);
        
        let interval = setInterval(() => {
            if (speedOfGame == 0) {
              
                clearInterval(interval)
                clicked=false;
                speedOfGame=500;
            }
            let copyArray = nextGen(array);
            array = copyArray;
            showGrid(array);
        }, speedOfGame);
    }

})

function nextGen(array) {
    const nextGenArray = array.map(arr => [...arr]);

    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const currentCell = array[row][col];
            let sumOfNeighbours = 0;
            for (let r = -1; r < 2; r++) {
                for (let c = -1; c < 2; c++) {
                    if (r === 0 && c === 0) {
                        break;
                    }
                    const row_Cell = row + r;
                    const col_Cell = col + c;

                    if (row_Cell >= 0 && col_Cell >= 0 && row_Cell < array.length && col_Cell < array.length) {
                        const currentNeighbour = array[row + r][col + c]
                        sumOfNeighbours += currentNeighbour;
                    }


                }
            }

            //game rules 
            if (currentCell === 1 && sumOfNeighbours < 2) {

                nextGenArray[row][col] = 0;
            }
            else if (currentCell === 1 && sumOfNeighbours > 3) {
                nextGenArray[row][col] = 0;
            }
            else if (currentCell === 0 && sumOfNeighbours === 3) {
                nextGenArray[row][col] = 1;
            }



        }


    }



    return nextGenArray;

}