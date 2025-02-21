// addition.test.ts
import { Calculatrice } from '$lib/Utils/Calculatrice';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe('Calculatrice', () => {
    it('devrait ajouter des nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('1');
        calc.addCal('+');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('3.000000');
    });

    it('devrait gérer la division par zéro', () => {
        const calc = new Calculatrice();
        calc.addCal('1');
        calc.addCal('/');
        calc.addCal('0');
        calc.calcul();
        calc.total.subscribe((value) => {
            expect(value.total).toBe('Erreur: division par 0');
        });
    });
});
