const X = 'x';
const O = 'o';
let turn = X;
let onGame = 1;

let options = {fieldSize: undefined, winStack: undefined};
let stack = [];
let gameArr = [];

let game = {
    setOptions() {
        while (!(options.fieldSize >= 3)) 
        options.fieldSize = prompt('Введите ширину игрового поля (не менее 3 клеток)', 3);
        while (!(options.winStack >= 3 && options.winStack <= options.fieldSize))
        options.winStack = prompt(`Введите длину линии для победы (не менее 3 и не более ширины поря [${options.fieldSize}])`, 3);

    },

    createArr() {
        for (let i = 0; i < options.fieldSize; i++) {
            gameArr[i] = [];
            for (let j = 0; j < options.fieldSize; j++) {
                gameArr[i][j] = 0;
            }
        }
    },

    createField() {
        for (let i = 0; i < options.fieldSize; i++) {
            let row = this.getBlock('row');
            gameBlock.append( row);
            for (let j = 0; j < options.fieldSize; j++) {
                let cell =  this.getBlock('cell');
                row.append( cell);
                cell.setAttribute('data-ver', i);
                cell.setAttribute('data-hor', j);
            }
        }
    },

    getBlock(className, tag = 'div') {
        let block = document.createElement(tag);
        if (className) block.className = className;
        return block;
    },

    createEvent() {
        let self = this;
        gameBlock.onclick = function(event) {
            if (onGame) {
                let target = event.target;
                let targetY = target.dataset.ver;
                let targetX = target.dataset.hor;
                while (target != gameBlock) {
                    if (target.className == 'cell' && target.innerHTML == '') {
                        target.innerHTML = turn;
                        gameArr[targetY][targetX] = {'flag': turn, 'ver': targetY, 'hor': targetX};
                        self.horCheck(targetY, targetX);
                        self.verCheck(targetY, targetX);
                        self.diagDownCheck(targetY, targetX);
                        self.diagUpCheck(targetY, targetX);
                        // console.log(gameArr[targetY][targetX]);
                        self.changeTurn();
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    },

    horCheck(ver, hor) {
        stack.push(gameArr[ver][hor]);
        this.horCheckPrev(ver, hor);
        this.horCheckNext(ver, hor);
        if (stack.length >= options.winStack) this.gameWin(stack);
        stack = [];
        return;
    },
    
    horCheckPrev(ver, hor) {
        hor--;
        while (hor >= 0 && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            hor--;
        } 
    },
    
    horCheckNext(ver, hor) {
        hor++;
        while (hor < gameArr.length && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            hor++;
        } 
    },
    
    verCheck(ver, hor) {
        stack.push(gameArr[ver][hor]);
        this.verCheckPrev(ver, hor);
        this.verCheckNext(ver, hor);
        if (stack.length >= options.winStack) this.gameWin(stack);
        stack = [];
        return;
    },
    
    verCheckPrev(ver, hor) {
        ver--;
        while (ver >= 0 && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver--;
        } 
    },
    
    verCheckNext(ver, hor) {
        ver++;
        while (ver < gameArr.length && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver++;
        } 
    },

    diagUpCheck(ver, hor) {
        stack.push(gameArr[ver][hor]);
        this.diagUpCheckPrev(ver, hor);
        this.diagUpCheckNext(ver, hor);
        if (stack.length >= options.winStack) this.gameWin(stack);
        stack = [];
        return;
    },
    
    diagUpCheckPrev(ver, hor) {
        ver++;
        hor--;
        while (ver < gameArr.length && hor >= 0 && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver++;
            hor--;
        } 
    },
    
    diagUpCheckNext(ver, hor) {
        ver--;
        hor++;
        while (ver >= 0 && hor < gameArr.length && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver--;
            hor++;
        } 
    },

    diagDownCheck(ver, hor) {
        stack.push(gameArr[ver][hor]);
        this.diagDownCheckPrev(ver, hor);
        this.diagDownCheckNext(ver, hor);
        if (stack.length >= options.winStack) this.gameWin(stack);
        stack = [];
        return;
    },
    
    diagDownCheckPrev(ver, hor) {
        ver--;
        hor--;
        while (ver >= 0 && hor >= 0 && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver--;
            hor--;
        } 
    },
    
    diagDownCheckNext(ver, hor) {
        ver++;
        hor++;
        while (ver < gameArr.length && hor < gameArr.length && gameArr[ver][hor].flag == turn) {
            stack.push(gameArr[ver][hor]);
            ver++;
            hor++;
        } 
    },
    
    changeTurn() {
        if (turn == X) {
            turn = O
        } else turn = X;
        return turn;
    },
    
    gameWin(stack) {
        onGame = 0;
        stack.forEach(element => {
            let elem = document.querySelector(`.cell[data-ver="${element.ver}"][data-hor="${element.hor}"]`);
            elem.style.background = "green";
        });
        return onGame;
    }
}
game.setOptions();
console.dir(options);

let gameBlock = document.querySelector('.gameBlock');
game.createArr();
game.createField();
game.createEvent();