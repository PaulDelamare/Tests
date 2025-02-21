// multiplication.test.ts
import { Calculatrice } from '$lib/Utils/Calculatrice';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe('Calculatrice - Multiplication', () => {

    // Test de la multiplication de deux nombres
    it('devrait multiplier des nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('3');
        calc.addCal('×');
        calc.addCal('4');
        calc.calcul();
        expect(get(calc.total).total).toBe('12');
        calc.reset();
    });

    // Test de la multiplication de plusieurs nombres
    it('devrait multiplier plusieurs nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('2');
        calc.addCal('×');
        calc.addCal('3');
        calc.addCal('×');
        calc.addCal('4');
        calc.calcul();
        expect(get(calc.total).total).toBe('24');
        calc.reset();
    });
    
    // Test de la multiplication par zéro
    it('devrait retourner zéro lorsqu\'on multiplie par zéro', () => {
        const calc = new Calculatrice();
        calc.addCal('5');
        calc.addCal('×');
        calc.addCal('0');
        calc.calcul();
        expect(get(calc.total).total).toBe('0');
        calc.reset();
    });

    // Test de la multiplication avec des résultats très grands
    it('devrait gérer les résultats très grands', () => {
        const calc = new Calculatrice();
        calc.addCal('1000');
        calc.addCal('×');
        calc.addCal('1000');
        calc.calcul();
        expect(get(calc.total).total).toBe('1000000');
        calc.reset();
    });

    // Test de la multiplication avec des résultats très petits
    it('devrait gérer les résultats très petits', () => {
        const calc = new Calculatrice();
        calc.addCal('0.0001');
        calc.addCal('×');
        calc.addCal('0.0002');
        calc.calcul();
        expect(get(calc.total).total).toBe('2e-8');
        calc.reset();
    });

    // Test de la multiplication avec des entrées invalides
    it('devrait retourner une erreur si l\'entrée est invalide', () => {
        const calc = new Calculatrice();
        calc.addCal('a');
        calc.addCal('×');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('Erreur: division par 0');
        calc.reset();
    });

});
