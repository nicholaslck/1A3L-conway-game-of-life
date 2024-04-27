<script lang="ts">
  import * as core from 'core';

  export let rows: number;
  export let cols: number;
  export let mode: string = 'edit';
  export let steps: number = 0;

  let board: core.Board;

  export const reset = () => {
    board = core.generateNewBoard(rows, cols);
  };

  const next = () => {
    board = core.getNextBoard(board);
  };

  const handleCellClick = (row: number, col: number) => {
    if (mode === 'edit') {
      board[row][col] = board[row][col] ? 0 : 1;
    }
  };

  $: rows && cols && reset();

  $: steps && next();
</script>

<div class="board">
  {#if board}
    {#each board as row, i}
      <div class="row">
        {#each row as cell, j}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="cell"
            class:edit={mode === 'edit'}
            style="background-color: {cell ? 'black' : 'white'};"
            on:click={() => handleCellClick(i, j)}
          />
        {/each}
      </div>
    {/each}
  {/if}
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
  }

  .cell {
    min-width: 10px;
    min-height: 10px;
    width: 10x;
    height: 10px;
    background-color: white;
    border: 1px solid black;
  }

  .cell.edit {
    cursor: pointer;
  }
</style>
