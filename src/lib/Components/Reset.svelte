<script lang="ts">
	import type { Calculatrice } from "$lib/Utils/Calculatrice";


    export let calculatrice: Calculatrice;

</script>
<button on:click={calculatrice.reset}>
    C
</button>