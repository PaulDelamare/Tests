// addition.test.ts
import { Calculatrice } from '$lib/Utils/Calculatrice';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe('Calculatrice - Addition', () => {

    // Test de l'addition de deux nombres
    it('devrait additionner des nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('1');
        calc.addCal('+');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('3');
        calc.reset();
    });

    // Test de l'addition de plusieurs nombres
    it('devrait additionner plusieurs nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('1');
        calc.addCal('+');
        calc.addCal('2');
        calc.addCal('+');
        calc.addCal('3');
        calc.calcul();
        expect(get(calc.total).total).toBe('6');
        calc.reset();
    });

    // Test de l'addition avec des résultats décimaux
    it('devrait gérer les résultats décimaux', () => {
        const calc = new Calculatrice();
        calc.addCal('1.5');
        calc.addCal('+');
        calc.addCal('2.3');
        calc.calcul();
        expect(get(calc.total).total).toBe('3,8');
        calc.reset();
    });

    // Test de l'addition avec des résultats négatifs
    it('devrait gérer les résultats négatifs', () => {
        const calc = new Calculatrice();
        calc.addCal('-1');
        calc.addCal('+');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('1');
        calc.reset();
    });

    // Test de l'addition avec des résultats très grands
    it('devrait gérer les résultats très grands', () => {
        const calc = new Calculatrice();
        calc.addCal('1000000');
        calc.addCal('+');
        calc.addCal('2000000');
        calc.calcul();
        expect(get(calc.total).total).toBe('3000000');
        calc.reset();
    });

    // Test de l'addition avec des résultats très petits
    it('devrait gérer les résultats très petits', () => {
        const calc = new Calculatrice();
        calc.addCal('0.000001');
        calc.addCal('+');
        calc.addCal('0.000002');
        calc.calcul();
        expect(get(calc.total).total).toBe('0,000003');
        calc.reset();
    });

    // Test de l'addition avec des entrées invalides
    it('devrait retourner une erreur si l\'entrée est invalide', () => {
        const calc = new Calculatrice();
        calc.addCal('a');
        calc.addCal('+');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('Erreur: division par 0');
        calc.reset();
    });

});
