<script lang="ts">
	import { Calculatrice } from "../lib/Utils/Calculatrice";
	import Button from "../lib/Components/Button.svelte";
	import Historic from "../lib/Components/Historic.svelte";
	import Equal from "../lib/Components/Equal.svelte";
	import Reset from "../lib/Components/Reset.svelte";
	import Remove from "../lib/Components/Remove.svelte";
	import { total } from "../lib/Stores/Total.store";

	const calculatrice = new Calculatrice();
</script>

<main>
	<Historic {calculatrice} />
	<div class="bloc-calcul">
		<input class="calcul" type="text" bind:value={$total.total} />
	</div>
	<h1>= {$total.prev}</h1>
	<div class="touches">
		{#each calculatrice.getNumListString() as num}
			<Button
				content={num}
				on:add={(event) => {
					calculatrice.addCal(event.detail);
				}}
			/>
		{/each}
		{#each calculatrice.getSignes() as signe}
			<Button
				content={signe}
				on:add={(event) => {
					calculatrice.addCal(event.detail);
				}}
			/>
		{/each}
		<Equal {calculatrice} />
		<Reset {calculatrice} />
		<Remove {calculatrice} />
	</div>
</main>

<style>
	main {
		width: 900px;
		margin: 0 auto;
	}
	.bloc-calcul .calcul {
		font-size: 1.5rem;
		color: #777;
		text-align: end;
		width: 100%;
		border: none;
		font-weight: 500;
		padding: 0.7rem;
		border-radius: 10px;
	}
	.touches {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
</style>
