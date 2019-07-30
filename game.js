const X = 'x';
const O = 'o';

class Game {
    constructor() {
        this.gameState = -2; // -2: поле не создано; -1: ничья; 0: победа игрока; 1: идет игра;
    }

    newGame() {
        this.clearGame();
        this.createArr();
        this.createField();
        this.checkScreenSize();
    }

    clearGame() {
        gameBlock.classList.remove('game-block--display-none');
        gameBlock.innerHTML = '';
        this.fieldArr = [];
        this.stack = [];
        this.turn = X;
        this.cellQuantity = 0;
        this.cellCount = 0;
        this.gameState = 1;
    }

    createArr() {
        for (let i = 0; i < this.fieldSize; i++) {
            this.fieldArr[i] = [];
            for (let j = 0; j < this.fieldSize; j++) {
                this.fieldArr[i][j] = 0;
                this.cellQuantity++;
            }
        }
    }

    createField() {
        for (let i = 0; i < this.fieldSize; i++) {
            let row = this.getBlock('game-block__row');
            gameBlock.append(row);
            for (let j = 0; j < this.fieldSize; j++) {
                let cell =  this.getBlock('game-block__cell');
                row.append(cell);
                cell.setAttribute('data-ver', i);
                cell.setAttribute('data-hor', j);
            }
        }
    }

    checkScreenSize() {
        let docElem = document.documentElement;
        let wrapper = document.querySelector('.wrapper');

        if (docElem.clientHeight < gameBlock.clientHeight) {
            wrapper.classList.add('wrapper--align-y-none');
        } else {
            wrapper.classList.remove('wrapper--align-y-none');
        }
        if (docElem.clientWidth < gameBlock.clientWidth) {
            wrapper.classList.add('wrapper--align-x-none');
        } else {
            wrapper.classList.remove('wrapper--align-x-none');
        }
    }

    windowResizeEvent() {
        window.onresize = () => {
            this.checkScreenSize();
        };
    }

    getBlock(className, tag = 'div') {
        let block = document.createElement(tag);
        if (className) block.className = className;
        return block;
    }

    createGameEvent() {
        gameBlock.onclick = (event) => {
            if (this.gameState === 1) {
                let target = event.target;
                let targetY = target.dataset.ver;
                let targetX = target.dataset.hor;
                while (target != gameBlock) {
                    if (target.className === 'game-block__cell' && target.innerHTML === '') {
                        target.innerHTML = this.turn;
                        this.fieldArr[targetY][targetX] = {'flag': this.turn, 'ver': targetY, 'hor': targetX};
                        this.cellCount++;
                        this.lineCheck(targetY, targetX, this.horCheckPrev, this.horCheckNext);
                        this.lineCheck(targetY, targetX, this.verCheckPrev, this.verCheckNext);
                        this.lineCheck(targetY, targetX, this.diagUpCheckPrev, this.diagUpCheckNext);
                        this.lineCheck(targetY, targetX, this.diagDownCheckPrev, this.diagDownCheckNext);
                        this.changeTurn();
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    }

    lineCheck(ver, hor, checkPrev, checkNext) {
        if (this.gameState !== 1) return;
        this.stack.push(this.fieldArr[ver][hor]);
        checkPrev.call(this, ver, hor);
        checkNext.call(this, ver, hor);
        this.checkGameEnd(this.stack);
        this.stack = [];
    }
    
    horCheckPrev(ver, hor) {
        hor--;
        while (hor >= 0 && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            hor--;
        }
    }
    
    horCheckNext(ver, hor) {
        hor++;
        while (hor < this.fieldArr.length && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            hor++;
        }
    }
    
    verCheckPrev(ver, hor) {
        ver--;
        while (ver >= 0 && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver--;
        }
    }
    
    verCheckNext(ver, hor) {
        ver++;
        while (ver < this.fieldArr.length && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver++;
        }
    }
    
    diagUpCheckPrev(ver, hor) {
        ver++;
        hor--;
        while (ver < this.fieldArr.length && hor >= 0 && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver++;
            hor--;
        }
    }
    
    diagUpCheckNext(ver, hor) {
        ver--;
        hor++;
        while (ver >= 0 && hor < this.fieldArr.length && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver--;
            hor++;
        }
    }

    diagDownCheckPrev(ver, hor) {
        ver--;
        hor--;
        while (ver >= 0 && hor >= 0 && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver--;
            hor--;
        }
    }
    
    diagDownCheckNext(ver, hor) {
        ver++;
        hor++;
        while (ver < this.fieldArr.length && hor < this.fieldArr.length && this.fieldArr[ver][hor].flag === this.turn) {
            this.stack.push(this.fieldArr[ver][hor]);
            ver++;
            hor++;
        }
    }
    
    changeTurn() {
        if (this.turn === X) {
            this.turn = O
        } else this.turn = X;
        return this.turn;
    }
    
    checkGameEnd(stack) {
        if (stack.length === +this.winStack) {
            this.gameState = 0;
            stack.forEach(element => {
                let elem = document.querySelector(`.game-block__cell[data-ver="${element.ver}"][data-hor="${element.hor}"]`);
                elem.style.background = "green";
            });
            menu.menuToggle();
            return;
        }
        if (this.cellCount === this.cellQuantity) {
            this.gameState = -1;
            menu.menuToggle();
            return;
        }
    }
}

let gameBlock = document.querySelector('.game-block');
let game = new Game;
game.windowResizeEvent();
game.createGameEvent();
