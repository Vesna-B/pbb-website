const mathjs = require('mathjs');
const potencijal = require('./potencijal1TackeUProstoruSaLikovima');
const ek = require('./EkUTackiANaPravcuAB');

const potencijalPravcaTacakaSaLikovima = (uzemljivac, XYZtacke, roZemlje, Rcoveka, Rstopala, Rt) => {
    //XYZtacke je struktura koja sadrzi nizove x, y, z
    n = XYZtacke.x.length;

    V = new Array();
    for (let i = 0; i < n; i++) {
        V[i] = 0;
    }
    Ed = new Array();
    for (let i = 0; i < n; i++) {
        Ed[i] = 0;
    }
    Ek = new Array();
    for (let i = 0; i < n; i++) {
        Ek[i] = 0;
    }
    Ud = new Array();
    for (let i = 0; i < n; i++) {
        Ud[i] = 0;
    }
    Uk = new Array();
    for (let i = 0; i < n; i++) {
        Uk[i] = 0;
    }


    A = {
        x: XYZtacke.x[0],
        y: XYZtacke.y[0],
        z: XYZtacke.z[0]
    }
    B = {
        x: XYZtacke.x[n-1],
        y: XYZtacke.y[n-1],
        z: XYZtacke.z[n-1]
    }

    cinilacUd = Rcoveka / (Rcoveka + Rstopala/2 + Rt)
    cinilacUk = Rcoveka / (Rcoveka + 2*Rstopala + Rt)

    console.log("uzemljivac.U = " + uzemljivac.U);

    for (let i = 0; i < n; i++) {
        tacka = {
            x: XYZtacke.x[i],
            y: XYZtacke.y[i],
            z: XYZtacke.z[i]
        }
        V[i] = potencijal.potencijal1TackeUProstoruSaLikovima(uzemljivac, tacka, roZemlje);
        Ed[i] = uzemljivac.U - V[i];
        Ek[i] = ek.EkUTackiANaPravcuAB(uzemljivac, tacka, A, B, roZemlje);
        Ud[i] = cinilacUd * Ed[i];
        Uk[i] = cinilacUk * Ek[i];

        console.log("V[" + i + "] = " + V[i]);
        console.log("Ed[" + i + "] = " + Ed[i]);
    }


    return pravac = {
        V: V,
        Ed: Ed,
        Ek: Ek,
        Ud: Ud,
        Uk: Uk
    }
   
}


exports.potencijalPravcaTacakaSaLikovima = potencijalPravcaTacakaSaLikovima;