<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import Board from './lib/Board.svelte';

  $: mode = 'edit';
  $: rows = 50;
  $: cols = 50;
  $: speed = 8;
  $: steps = 0;

  let child: SvelteComponent | undefined;

  let timer: NodeJS.Timeout;

  const reset = () => {
    steps = 0;
    child?.reset();
  };

  $: if (mode === 'run') {
    clearInterval(timer);
    const ms = (1 / speed) * 1000;
    timer = setInterval(() => {
      steps += 1;
    }, ms);
  } else {
    clearInterval(timer);
  }
</script>

<main>
  <h1>Conway's Game of Life</h1>
  <h2>Svelte implementation</h2>

  <form>
    <label for="rows">Rows:</label>
    <input
      type="number"
      id="rows"
      name="rows"
      min="1"
      max="100"
      bind:value={rows}
      disabled={mode === 'run'}
    />
    <label for="cols">Columns:</label>
    <input
      type="number"
      id="cols"
      name="cols"
      min="1"
      max="100"
      bind:value={cols}
      disabled={mode === 'run'}
    />
    <label for="speed">Growth speed:</label>
    <input
      type="number"
      id="speed"
      name="speed"
      min="1"
      max="20"
      bind:value={speed}
      disabled={mode === 'run'}
    />

    {#if mode === 'edit'}
      <button type="button" on:click={() => (mode = 'run')}>Start</button>
    {:else}
      <button type="button" on:click={() => (mode = 'edit')}>Stop</button>
    {/if}

    <button type="button" on:click={reset}>Reset</button>
  </form>
  <p>Generations: {steps}</p>

  <Board {rows} {cols} {mode} {steps} bind:this={child} />
</main>
<footer>
  <p>
    This project is developed by <a href="https://github.com/nicholaslck">@nicholaslck</a>, the source code is available at <a href="https://github.com/nicholaslck/1A3L-conway-game-of-life">Github</a>.
  </p>
</footer>

<style>
  form button {
    margin-left: 30px;
  }

  form label[for='cols'],
  form label[for='speed'] {
    margin-left: 10px;
  }

  form {
    margin-bottom: 36px;
  }
</style>
