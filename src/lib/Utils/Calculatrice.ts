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
            if ([...n.total].pop() != "+" && [...n.total].pop() != "-") {
                const result = () => {
                    try {
                        let expr: string;
                        // 🚀 Vérifie si le dernier caractère est un nombre
                        if (!Number.isNaN(Number(n.total.slice(-1)))) {
                            expr = n.total
                                .replaceAll("×", "*")
                                .replaceAll("x", "*")
                                .replaceAll("X", "*")
                                .replaceAll(",", ".");
                        } else {
                            expr = n.total.slice(0, -1)
                                .replaceAll("×", "*")
                                .replaceAll("x", "*")
                                .replaceAll("X", "*")
                                .replaceAll(",", ".");
                        }
                        const res = eval(expr);
                        // 🚀 Si le résultat n'est pas fini (division par 0), on lance une erreur.
                        if (!isFinite(res)) {
                            throw new Error("Division par 0");
                        }
                        return res.toFixed(6);
                    } catch (error) {
                        return "Erreur: division par 0";
                    }
                };
                const res = result();
                // 🚀 En cas d'erreur, on met à jour le total avec le message d'erreur.
                if (res.startsWith("Erreur")) {
                    return { ...n, total: res };
                } else {
                    if (n.historic.length >= 5) {
                        n.historic.shift();
                    }
                    return {
                        historic: [
                            n.total + " = " + res.toString().replaceAll(".", ","),
                            ...n.historic,
                        ],
                        total: res.toString(),
                        prev: parseFloat(res),
                    };
                }
            } else {
                return { ...n };
            }
        });
    };


    public rewind = (a: string) => {
        this.total.update((n) => {
            let withoutSpace = a.replace(/ /g, "");
            withoutSpace = withoutSpace.replace(",", ".");
            let array = withoutSpace.split("=");
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