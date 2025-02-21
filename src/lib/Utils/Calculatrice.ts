import { total } from "$lib/Stores/Total.store";

export class Calculatrice {
    private signes = [",", "+", "-", "×", "/"];
    private numListString = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    public total = total;

    public addCal = (a: string): void => {
        this.total.update((n) => {
            if (typeof n.total === "string") {
                if (n.total == "0" && (a == "+" || a == "÷" || a == "×")) {
                    return { ...n };
                } else if (this.signes.includes(a) && this.signes.includes([...n.total].pop())) {
                    return { ...n };
                } else if (n.total[0] == "0" && n.total.length == 1 && a != ",") {
                    return { ...n, total: a };
                } else if (n.total.includes(",") && a == ",") {
                    return { ...n };
                } else {
                    return { ...n, total: n.total + a };
                }
            } else if (!isNaN(n.total)) {
                if (this.signes.includes(a)) {
                    return { ...n, total: n.total + a };
                } else {
                    return { ...n, total: a };
                }
            }
        });
    };

    public calcul = () => {
        this.total.update((n) => {
            // Vérifier si le dernier caractère est un opérateur
            const lastChar = n.total.slice(-1);
            if (this.signes.includes(lastChar)) {
                // Supprimer le dernier caractère s'il s'agit d'un opérateur
                n.total = n.total.slice(0, -1);
            }

            // Remplacer les opérateurs et les virgules pour correspondre à l'évaluation JavaScript
            const expr = n.total
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/,/g, '.');

            try {
                // Évaluer l'expression
                const res = eval(expr);

                // Vérifier si le résultat est fini (pas une division par zéro)
                if (!isFinite(res)) {
                    throw new Error("Division par 0");
                }

                // Convertir le résultat en chaîne et remplacer le point par une virgule
                let resultStr = res.toString().replace('.', ',');

                // Supprimer les zéros inutiles après la virgule
                if (resultStr.includes(',')) {
                    resultStr = resultStr.replace(/,?0+$/, '');
                }

                // Mettre à jour l'historique et le total
                if (n.historic.length >= 5) {
                    n.historic.shift();
                }
                return {
                    ...n,
                    historic: [...n.historic, `${n.total} = ${resultStr}`],
                    total: resultStr,
                    prev: res,
                };
            } catch (error) {
                // En cas d'erreur (par exemple, division par zéro), afficher un message d'erreur
                return { ...n, total: "Erreur: division par 0" };
            }
        });
    };



    public rewind = (a: string) => {
        this.total.update((n) => {
            let withoutSpace = a.replace(/ /g, "");
            withoutSpace = withoutSpace.replace(",", ".");
            const array = withoutSpace.split("=");
            console.log(array);

            return { ...n, total: array["0"], prev: parseFloat(array["1"]) };
        });
    };

    public remove = () => {
        this.total.update((n) => {
            if (n.total.length <= 1) {
                return { ...n, total: '0' }
            } else {
                return { ...n, total: n.total.slice(0, n.total.length - 1) }
            }
        })
    }

    public reset = () => {
        this.total.update((n) => {
            return { ...n, total: '0', prev: 0 }
        })
    }

    public getSignes(): string[] {
        return this.signes;
    }

    public getNumListString(): string[] {
        return this.numListString;
    }
}