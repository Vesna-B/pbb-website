const mrezaTacakaNaPovrsiniIPravci1i2 = (uzemljivac, granicaUdaljenostiOdUzemljivaca, korakMreze) => {

    Xmin = 0;
    Ymin = 0;
    Xmax = 0;
    Ymax = 0;

    XpomocA = new Array(uzemljivac.brojElemenata);
    YpomocA = new Array(uzemljivac.brojElemenata);
    XpomocB = new Array(uzemljivac.brojElemenata);
    YpomocB = new Array(uzemljivac.brojElemenata);

    for (let i = 0; i < uzemljivac.brojElemenata; i++) {
        XpomocA[i] = uzemljivac.element[i].A.x;
        YpomocA[i] = uzemljivac.element[i].A.y;
        XpomocB[i] = uzemljivac.element[i].B.x;
        YpomocB[i] = uzemljivac.element[i].B.y;
    }

    Xmin = Math.min(...XpomocA, ...XpomocB);
    Ymin = Math.min(...YpomocA, ...YpomocB);
    Xmax = Math.max(...XpomocA, ...XpomocB);
    Ymax = Math.max(...YpomocA, ...YpomocB);

    zbirXmaxGranica = Xmax + granicaUdaljenostiOdUzemljivaca;
    zbirYmaxGranica = Ymax + granicaUdaljenostiOdUzemljivaca;
    razlikaXminGranica = Xmin - granicaUdaljenostiOdUzemljivaca;
    razlikaYminGranica = Ymin - granicaUdaljenostiOdUzemljivaca;

    XbrojTacakaMreze = Math.round((zbirXmaxGranica - razlikaXminGranica) / korakMreze);
    YbrojTacakaMreze = Math.round((zbirYmaxGranica - razlikaYminGranica) / korakMreze);

    korakX = (zbirXmaxGranica - razlikaXminGranica) / (XbrojTacakaMreze - 1);
    korakY = (zbirYmaxGranica - razlikaYminGranica) / (YbrojTacakaMreze - 1);


    nizX = new Array(XbrojTacakaMreze);
    nizX[0] = razlikaXminGranica;
    for (let i = 1; i < XbrojTacakaMreze; i++) {
        nizX[i] = nizX[i-1] + korakX;
    }
    nizY = new Array(YbrojTacakaMreze);
    nizY[0] = razlikaYminGranica;
    for (let i = 1; i < YbrojTacakaMreze; i++) {
        nizY[i] = nizY[i-1] + korakY;
    }
    nizZ = new Array(XbrojTacakaMreze);
    for (let i = 0; i < XbrojTacakaMreze; i++) {
        nizZ[i] = 0;
    }


    pravacIx = new Array(XbrojTacakaMreze);
    pravacIx[0] = razlikaXminGranica;
    for (let i = 1; i < XbrojTacakaMreze; i++) {
        pravacIx[i] = pravacIx[i-1] + korakX;
    }
    pravacIy = new Array(XbrojTacakaMreze);
    for (let i = 0; i < XbrojTacakaMreze; i++) {
        pravacIy[i] = (Ymin + Ymax) / 2;
    }
    pravacIz = new Array(XbrojTacakaMreze);
    for (let i = 0; i < XbrojTacakaMreze; i++) {
        pravacIz[i] = 0;
    }
    

    mrezaTacaka = {
        x: nizX,
        y: nizY,
        z: nizZ
    }
    pravacI = {
        x: pravacIx,
        y: pravacIy,
        z: pravacIz
    }


    return XYtackeNaPovrsini = {
        mrezaTacaka: mrezaTacaka,
        pravacI: pravacI
    }
    
}


exports.mrezaTacakaNaPovrsiniIPravci1i2 = mrezaTacakaNaPovrsiniIPravci1i2;