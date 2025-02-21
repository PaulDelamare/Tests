<script lang="ts">
	import { total } from "$lib/Stores/Total.store";
	import type { Calculatrice } from "$lib/Utils/Calculatrice";


  export let calculatrice: Calculatrice;

</script>

<ul>
  {#if $total.historic.length != 0}
    {#each $total.historic as value}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        on:click={() => {
          calculatrice.rewind(value);
        }}
      >
        {value}
      </li>
    {/each}
  {/if}
</ul>

<style>
  ul {
    list-style: none;

    height: 6rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
  }
  ul li {
    text-align: end;
    font-size: 1.2rem;
    color: #555;
    font-weight: bold;
    padding-right: 1rem;
    transition: all 0.3s;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
  }
  ul li:hover {
    background-color: #333;
  }
</style>
