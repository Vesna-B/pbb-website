const mathjs = require('mathjs');
const geometrija = require('./geometrija');

const uzemljivacRuMatricaSaLikovima = (prosledjeniUzemljivac, roZemlje, dl) => {
    uzemljivac = prosledjeniUzemljivac;

    for (let i = 0; i < uzemljivac.brojElemenata; i++) {
        for (let j = 0; j < uzemljivac.brojElemenata; j++) {
            sumaLn = 0;
            sumaLnLik = 0;
            m = 0;

            for (let k = 0; k < uzemljivac.element[j].brojTacakaNaElementu; k++) {
                x = uzemljivac.element[j].C.subset(mathjs.index(k, 0));
                y = uzemljivac.element[j].C.subset(mathjs.index(k, 1));
                z = uzemljivac.element[j].C.subset(mathjs.index(k, 2));
                tackaC = { x: x, y: y, z: z }
                
                r1 = geometrija.rastojanje2TackeU3D(uzemljivac.element[i].A, tackaC);
                r2 = geometrija.rastojanje2TackeU3D(uzemljivac.element[i].B, tackaC);
                r1Lik = geometrija.rastojanje2TackeU3D(uzemljivac.elementLik[i].A, tackaC);
                r2Lik = geometrija.rastojanje2TackeU3D(uzemljivac.elementLik[i].B, tackaC);
            
                if (r1 != 0  &&  r2 != 0  &&  r1 > Math.pow(10, -15)  &&  r2 > Math.pow(10, -15)) {
                    sumaLn = sumaLn + Math.log((r1 + r2 + uzemljivac.element[i].L) / (r1 + r2 - uzemljivac.element[i].L));
                    sumaLnLik = sumaLnLik + Math.log((r1Lik + r2Lik + uzemljivac.elementLik[i].L) / (r1Lik + r2Lik - uzemljivac.elementLik[i].L));
                    m = m + 1;
                }   
            }

            alfaIK = (roZemlje / (4 * Math.PI * uzemljivac.element[i].L)) * (sumaLn / m);
            alfaIlikK = (roZemlje / (4 * Math.PI * uzemljivac.elementLik[i].L)) * (sumaLnLik / m);

            if (i == j) {
                vrednost = (roZemlje / (2 * Math.PI * uzemljivac.element[i].L)) * Math.log((2 * uzemljivac.element[i].L) / dl);
                uzemljivac.RuMatrica.subset(mathjs.index(i, j), vrednost);
            }
            else {
                vrednost = alfaIK + alfaIlikK;
                uzemljivac.RuMatrica.subset(mathjs.index(i, j), vrednost);
            }
        }
    }

    I1transponovano = mathjs.transpose(uzemljivac.I1);
    RuMatricaInverzna = mathjs.inv(uzemljivac.RuMatrica);
    proizvodMatrica = mathjs.multiply(I1transponovano, RuMatricaInverzna);
    proizvodMatrica = mathjs.multiply(proizvodMatrica, uzemljivac.I1);
    uzemljivac.Ru = mathjs.inv(proizvodMatrica);

    return uzemljivac;

}


exports.uzemljivacRuMatricaSaLikovima = uzemljivacRuMatricaSaLikovima;