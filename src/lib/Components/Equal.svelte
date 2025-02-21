<script lang="ts">
	import type { Calculatrice } from "$lib/Utils/Calculatrice";

  export let calculatrice: Calculatrice;

  const keydown = (e: { code: string; }) => {
    if (e.code == "Enter") {
      calculatrice.calcul();
    }
  };
</script>

<svelte:window on:keydown={keydown} />

<button on:click={calculatrice.calcul}> = </button>
