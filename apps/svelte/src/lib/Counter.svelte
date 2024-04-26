<script lang="ts">
  import { core } from "core"
  
  let count: number = 0;
  const increment = () => {
    count += 1;
  };


</script>

<button on:click={increment}>
  count is {count}
</button>

<div>{ core() }</div>
