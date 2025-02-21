// calculatrice.test.ts
import { Calculatrice } from '$lib/Utils/Calculatrice';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe('Calculatrice', () => {

    // Test de la soustraction
    it('devrait soustraire des nombres correctement', () => {
        const calc = new Calculatrice();
        calc.addCal('5');
        calc.addCal('-');
        calc.addCal('2');
        calc.calcul();
        expect(get(calc.total).total).toBe('3');
        calc.reset()
    });

    it('devrait afficher un résultat négatif avec une virgule', () => {
        const calc = new Calculatrice();
        calc.addCal('3');
        calc.addCal('-');
        calc.addCal('5');
        calc.calcul();
        expect(get(calc.total).total).toBe('-2');
        calc.reset();
    });

    it('devrait retourner zéro pour la soustraction de deux nombres égaux', () => {
        const calc = new Calculatrice();
        calc.addCal('7');
        calc.addCal('-');
        calc.addCal('7');
        calc.calcul();
        expect(get(calc.total).total).toBe('0');
        calc.reset();
    });

    it('devrait soustraire correctement des nombres avec des décimales', () => {
        const calc = new Calculatrice();
        calc.addCal('10,5');
        calc.addCal('-');
        calc.addCal('4,2');
        calc.calcul();
        expect(get(calc.total).total).toBe('6,3');
        calc.reset();
    });

    it('devrait soustraire correctement des nombres très grands', () => {
        const calc = new Calculatrice();
        calc.addCal('1000000');
        calc.addCal('-');
        calc.addCal('999999');
        calc.calcul();
        expect(get(calc.total).total).toBe('1');
        calc.reset();
    });

    it('devrait retourner une erreur si ce n\'est pas un nombre', () => {
        const calc = new Calculatrice();
        calc.addCal('a');
        calc.addCal('-');
        calc.addCal('0');
        calc.calcul();
        calc.total.subscribe((value) => {
            expect(value.total).toBe('Erreur: division par 0');
        });
    });
});
