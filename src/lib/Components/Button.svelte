<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let content: string;

    const handleClick = () => {
        dispatch(
            'add',
            content
        )
    }
</script>

<button on:click={handleClick}>
    {content}
</button>