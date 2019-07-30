class Menu {
    menuToggle() {
        document.querySelector('.menu').classList.toggle('menu--active');
    }

    menuToggleEvent() {
        document.querySelector('.menu__btn-toggle').onclick = () => {
            this.menuToggle();
        }
    }

    setMaxLineEvent() {
        document.querySelector('#input-field').addEventListener('input', () => {
            document.querySelector('#input-line').setAttribute('max', document.querySelector('#input-field').value);
        });
    }

    startGameEvent() {
        this.messageEvent();
        document.querySelector('#new-game').addEventListener('submit', (event) => {
            event.preventDefault();

            document.querySelector('#input-line').setAttribute('max', document.querySelector('#input-field').value);
            game.fieldSize = document.querySelector('#input-field').value;
            game.winStack = document.querySelector('#input-line').value;
            game.newGame();
            this.menuToggle();
        });
    }

    messageEvent() {
        let messageText = document.querySelector('.menu__message');
        document.documentElement.addEventListener ('click', () => {
            if (game.gameState === 1) {
                messageText.innerHTML = `Ходит ${ game.turn === X ? 'X' : 'O' } ...`;
            } else if (game.gameState === 0) {
                messageText.innerHTML = `Побeда ${ game.turn === X ? 'O' : 'X' } !`;
            } else if (game.gameState === -1) {
                messageText.innerHTML = `Ничья !`;
            }
        });
    }
}

let menu = new Menu();
menu.menuToggleEvent();
menu.startGameEvent();
menu.setMaxLineEvent();
menu.menuToggle();


