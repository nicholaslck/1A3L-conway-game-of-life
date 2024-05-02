import * as core from './dist/core.mjs';
window.$lib = window.$lib || {};
window.$lib.core = core

window.coreGenerateNewBoard = (rows, cols) => {
    return window.$lib.core.generateNewBoard(rows, cols)
}

window.coreGetNextBoard = (board) => {
    return window.$lib.core.getNextBoard(board)
}