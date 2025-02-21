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
        expect(get(calc.total).total).toBe("3");
        calc.reset();
    });

    it('devrait retourner une erreur si ce n\'est pas un nombre', () => {
        const calc = new Calculatrice();
        calc.addCal('a');
        calc.addCal('+');
        calc.addCal('0');
        calc.calcul();
        calc.total.subscribe((value) => {
            expect(value.total).toBe('Erreur: division par 0');
        });
    });
});
