const mathjs = require('mathjs');
const geometrija = require('./geometrija');

const citanjePodatakaUzemljivac = (matricaPodatakaIzUlaznogFajla) => {
    matricaPodatakaZaObradu = matricaPodatakaIzUlaznogFajla;
    n = matricaPodatakaZaObradu.size();
    brojElemenata = n[0];               //broj vrsta u matrici
    brojTacakaNaElementu = 100;          

    element = new Array();
    elementLik = new Array();

    for (let i = 0; i < brojElemenata; i++) {
        ax = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 0));
        ay = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 1));
        az = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 2));

        bx = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 3));
        by = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 4));
        bz = mathjs.subset(matricaPodatakaZaObradu, mathjs.index(i, 5));

        A = { x: ax, y: ay, z: az }
        B = { x: bx, y: by, z: bz }
        L = geometrija.rastojanje2TackeU3D(A, B);
        C = geometrija.tackeCnaDuziABu3D(A, B, brojTacakaNaElementu);           

        likA = { x: ax, y: ay, z: -az }
        likB = { x: bx, y: by, z: -bz }
        likL = L;

        element[i] = {
            A: A,
            B: B,
            L: L,
            C: C,
            brojTacakaNaElementu: brojTacakaNaElementu
        }

        elementLik[i] = {
            A: likA,
            B: likB,
            L: likL
        }
    }
    

    I1 = mathjs.ones(brojElemenata, 1);
    Ivektor = mathjs.zeros(brojElemenata, 1);
    RuMatrica = mathjs.zeros(brojElemenata, brojElemenata);

    uzemljivac = {
        element: element,
        elementLik: elementLik,
        brojElemenata: brojElemenata,
        RuMatrica: RuMatrica,
        Ru: null,
        U: null,
        I: 0,
        Ivektor: Ivektor,
        I1: I1
    }

    return uzemljivac;
}


exports.citanjePodatakaUzemljivac = citanjePodatakaUzemljivac;