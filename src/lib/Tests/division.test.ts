// division.test.ts
import { Calculatrice } from '$lib/Utils/Calculatrice';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe('Calculatrice - Division', () => {

    // Test de la division par un nombre non nul
    it('devrait diviser des nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('6');
        calc.addCal('÷');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('3');
        calc.reset();
    });

    // Test de la division par zéro
    it('devrait gérer la division par zéro', () => {
        const calc = new Calculatrice();
        calc.addCal('5');
        calc.addCal('÷');
        calc.addCal('0');
        calc.calcul();
        expect(get(calc.total).total).toBe('Erreur: division par 0');
        calc.reset();
    });

    // Test de la division avec des résultats décimaux
    it('devrait gérer les résultats décimaux', () => {
        const calc = new Calculatrice();
        calc.addCal('7');
        calc.addCal('÷');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('3,5');
        calc.reset();
    });

    // Test de la division avec des résultats très petits
    it('devrait gérer les résultats très petits', () => {
        const calc = new Calculatrice();
        calc.addCal('1');
        calc.addCal('÷');
        calc.addCal('1000000');
        calc.calcul();
        expect(get(calc.total).total).toBe('0,000001');
        calc.reset();
    });

    // Test de la division avec des résultats très grands
    it('devrait gérer les résultats très grands', () => {
        const calc = new Calculatrice();
        calc.addCal('1000000');
        calc.addCal('÷');
        calc.addCal('1');
        calc.calcul();
        expect(get(calc.total).total).toBe('1000000');
        calc.reset();
    });

});
