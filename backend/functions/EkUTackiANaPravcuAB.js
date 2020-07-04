const geometrija = require('./geometrija');
const potencijal = require('./potencijal1TackeUProstoruSaLikovima');

const EkUTackiANaPravcuAB = (uzemljivac, tackaM, A, B, roZemlje) => {
    let Ek1Tacka;

    x = A.x - B.x;
    y = A.y - B.y;
    y = A.z - B.z;

    vektorP = { x: x, y: y, z: z }
    vektorPintenzitet = geometrija.rastojanje2TackeU3D(A, B);
    jedinicniVektor = {
        x: x / vektorPintenzitet,
        y: y / vektorPintenzitet,
        z: z / vektorPintenzitet
    }

    tackaN = {
        x: tackaM.x - jedinicniVektor.x,
        y: tackaM.y - jedinicniVektor.y,
        z: tackaM.z - jedinicniVektor.z
    }
    tackaP = {
        x: tackaM.x + jedinicniVektor.x,
        y: tackaM.y + jedinicniVektor.y,
        z: tackaM.z + jedinicniVektor.z
    }

    V1TackaM = potencijal.potencijal1TackeUProstoruSaLikovima(uzemljivac, tackaM, roZemlje);
    V1TackaN = potencijal.potencijal1TackeUProstoruSaLikovima(uzemljivac, tackaN, roZemlje);
    V1TackaP = potencijal.potencijal1TackeUProstoruSaLikovima(uzemljivac, tackaP, roZemlje);

    if (Math.abs(V1TackaM - V1TackaN) > Math.abs(V1TackaM - V1TackaP)) {
        Ek1Tacka = Math.abs(V1TackaM - V1TackaN)
    }
    else {
        Ek1Tacka = Math.abs(V1TackaM - V1TackaP);
    }

    return Ek1Tacka;
}


exports.EkUTackiANaPravcuAB = EkUTackiANaPravcuAB;

