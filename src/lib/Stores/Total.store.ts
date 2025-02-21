import { writable } from "svelte/store";

export const total= writable({
    prev: 0,
    total: '',
    historic: [],
});

