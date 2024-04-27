<script lang="ts">
  import * as core from 'core';

  export let rows: number;
  export let cols: number;
  export let mode: string = 'edit';
  export let steps: number = 0;

  let board: core.Board;
  let mousedown = false;

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="board"
  on:mousedown={() => (mousedown = true)}
  on:mouseup={() => (mousedown = false)}
>
  {#if board}
    {#each board as row, i}
      <div class="row">
        {#each row as cell, j}
          <div
            class="cell"
            class:edit={mode === 'edit'}
            style="background-color: {cell ? 'black' : 'white'};"
            on:mouseenter={() => {
              if (mousedown) {
                handleCellClick(i, j);
              }
            }}
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
    min-width: 14px;
    min-height: 14px;
    width: 14x;
    height: 14px;
    background-color: white;
    border: 1px solid black;
  }

  .cell.edit {
    cursor: pointer;
  }
</style>
