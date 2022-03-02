
var i, j, k,                                    //циклы                                                             //переменные
    board, table, row, cell, game = 1,          //доска
    rowNum = 20, cellNum = 20,
    snake = [], snakeSpeed = 120, score,        //змейка
    snakePosX, snakePosY,
    food = '', foodSpeed = 25, noFood = 1,     //корм
    foodPosition,
    direction = 'up',                           //направление
    blockPosition = '0_0',                       //препятствия
    movingInterval, createFoodInterval,         //интервал
    snakeCheckInterval, createInterval

function snakeCheck(){
    if (document.getElementById(snake[0]).className == 'cell snake snake' || 
    document.getElementById(snake[0]).className == 'block snake') {
        gameOver()
    }
}
function refresh(){
    location.reload();
}
function moveRules(e){                                                                                              //задание направления
    switch (e.keyCode){
        case 37: (direction != 'right') ? direction = 'left': undefined; break;
        case 38: (direction != 'down')  ? direction = 'up': undefined; break;
        case 39: (direction != 'left')  ? direction = 'right': undefined; break;
        case 40: (direction != 'up')    ? direction = 'down': undefined; break;
    }
}

function createFood(){                                                                                              //создание корма
    if (noFood == 1){
        foodPosition = parseInt(Math.random() * rowNum) + '_' + parseInt(Math.random() * cellNum);
        if (document.getElementById(foodPosition).className == 'cell'){
            document.getElementById(foodPosition).className = 'food';
            noFood = 0;
        } else { createFood();}
    } 
    if (document.getElementById(foodPosition).className  == 'cell'){
        document.querySelector('.options').innerText =  'Счёт: ' + (snake.length - 1);
        noFood = 1;
        addTail();
    }
}
function createBlock(){   
    if (document.getElementById(blockPosition).className == 'block'){
    document.getElementById(blockPosition).className = 'cell';  
    }
    blockPosition = parseInt(Math.random() * rowNum) + '_' + parseInt(Math.random() * cellNum);
    if (document.getElementById(blockPosition).className == 'cell'){
        document.getElementById(blockPosition).className = 'block';
    } else { createBlock();}
}

function addTail(){                                                                                                 //увеличение хвоста
    snake.push(foodPosition);
}

function moving(){                                                                                                  //передвижение
    document.getElementById(snake[snake.length - 1]).className = 'cell';
    for(i = 1; i <= snake.length - 1; i++){
        snake[snake.length - i] = snake[snake.length - 1 - i]; 
    }
    switch (direction){
        case 'up': 
            (snake[0].split('_')[0] == 0) ? snake[0] = rowNum + '_' + snake[0].split('_')[1]: false;
            snake[0] = snake[0].split('_');
            snake[0][0]--;
            snake[0] = snake[0].join('_');
            document.getElementById(snake[0]).className += ' snake'; break;
        case 'down':
            (snake[0].split('_')[0] == rowNum - 1) ? snake[0] = -1 + '_' + snake[0].split('_')[1]: false;
            snake[0] = snake[0].split('_');
            snake[0][0]++;
            snake[0] = snake[0].join('_');
            document.getElementById(snake[0]).className += ' snake';break;
        case 'left': 
            (snake[0].split('_')[1] == 0) ? snake[0] = snake[0].split('_')[0] + '_' + cellNum: false;
            snake[0] = snake[0].split('_');
            snake[0][1]--;
            snake[0] = snake[0].join('_');
            document.getElementById(snake[0]).className += ' snake'; break;
        case 'right': 
            (snake[0].split('_')[1] == cellNum - 1) ? snake[0] = snake[0].split('_')[0] + '_' + -1: false;
            snake[0] = snake[0].split('_');
            snake[0][1]++;
            snake[0] = snake[0].join('_');
            document.getElementById(snake[0]).className += ' snake'; break;
    }
}

function start(){                                                                               //начало игры
    snakePosX = parseInt(rowNum / 2);
    snakePosY = parseInt(cellNum / 2 - 1);
    snake.push(snakePosY + '_' + snakePosX);
    snake.push((snakePosY + 1) + '_' + snakePosX);
    document.getElementById(snake[0]).className += ' snake';
    document.getElementById(snake[1]).className += ' snake';
    movingInterval = setInterval(moving, snakeSpeed);
    createFoodInterval = setInterval(createFood, foodSpeed);
    snakeCheckInterval = setInterval(snakeCheck, 100);
    createInterval = setInterval(createBlock, 5000);
    addEventListener('keydown', moveRules);                                                      //задание управления
}

function init(){
    document.querySelector('.options').innerText =  'Счёт: ' + 0;
    board = document.querySelector('.board');                                                    //создание доски (init)
    table = document.createElement('table');
    for(i = 0; i < rowNum; i++){
        row = document.createElement('tr');
        for(j = 0; j < cellNum; j++){
            cell = document.createElement('td');
            cell.id = i + '_' + j;
            cell.className = 'cell';
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    board.appendChild(table);
    start();
}

function gameOver() {
    clearInterval(movingInterval)
    clearInterval(createFoodInterval)
    clearInterval(snakeCheckInterval)
    clearInterval(createInterval)
    game = 0
    playAgainButton = document.createElement('button')
    playAgainButton.innerHTML = 'Играть еще'
    playAgainButton.onclick = refresh
    document.querySelector('.options').innerHTML = ''
    document.querySelector('.board').innerHTML = ''
    document.querySelector('body').appendChild(playAgainButton)
    document.querySelector('body').style.margin = 'auto'
}
window.onload = init();                                                                          //инициализация