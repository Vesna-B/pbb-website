const geometrija = require('./geometrija');
const mathjs = require('mathjs');

const potencijal1TackeUProstoruSaLikovima = (uzemljivac, tackaA, roZemlje) => {
    RiTackaA = new Array();
    for (let i = 0; i < uzemljivac.brojElemenata; i++) {
        RiTackaA[i] = 0;
    }

    for (let i = 0; i < uzemljivac.brojElemenata; i++) {
        r1 = geometrija.rastojanje2TackeU3D(uzemljivac.element[i].A, tackaA);
        r2 = geometrija.rastojanje2TackeU3D(uzemljivac.element[i].B, tackaA);
        r1Lik = geometrija.rastojanje2TackeU3D(uzemljivac.elementLik[i].A, tackaA);
        r2Lik = geometrija.rastojanje2TackeU3D(uzemljivac.elementLik[i].B, tackaA);
    
        alfaIK = (roZemlje / (4 * Math.PI * uzemljivac.element[i].L)) * Math.log((r1 + r2 + uzemljivac.element[i].L) / (r1 + r2 - uzemljivac.element[i].L));
        alfaIlikK = (roZemlje / (4 * Math.PI * uzemljivac.elementLik[i].L)) * Math.log((r1Lik + r2Lik + uzemljivac.elementLik[i].L) / (r1 + r2 - uzemljivac.elementLik[i].L));
        
        RiTackaA[i] =  alfaIK + alfaIlikK;
    }


    V1 = mathjs.multiply(RiTackaA, uzemljivac.Ivektor);
    V1 = V1.subset(mathjs.index(0));
    
    return V1;
}


exports.potencijal1TackeUProstoruSaLikovima = potencijal1TackeUProstoruSaLikovima;