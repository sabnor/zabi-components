<script lang="ts">
  export let title: string = 'Hello World';
  export let count: number = 0;

  function increment() {
    count += 1;
  }
</script>

<style>
  h1 {
    color: #ff3e00;
  }

  button {
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
  }
</style>

<h1>{title}</h1>
<p>Count: {count}</p>
<button on:click={increment}>Increment</button>