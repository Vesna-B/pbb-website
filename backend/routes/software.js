const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mathjs = require('mathjs');
const Matrix = require('node-matrices');

const geometrija = require('../functions/geometrija');
const citanjePU = require('../functions/citanjePodatakaUzemljivac');
const uzemljivacRuM = require('../functions/uzemljivacRuMatricaSaLikovima');
const mrezaTacaka = require('../functions/mrezaTacakaNaPovrsiniIPravci1i2');
const potencijalPravca = require('../functions/potencijalPravcaTacakaSaLikovima');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/")
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLocaleLowerCase()
            .split(" ")
            .join("-");
        cb(null, name + "-" + Date.now() + "." + "txt");
    }
});



//router.post("", multer({ storage: storage }).single("imeFajla"), (req, res, next) => {

router.post("", (req, res, next) => {           //test - vratiti prethodnu liniju, izbrisati ovu
    let fileMatrix;
    let uzemljivac;
    let XYZtackeNaPovrsini;
    let pravacI;

    //------------------- original -----------------------------

    // IuzemljivacaEff = req.body.IuzemljivacaEff;
    // duzinaSegmenta = req.body.duzinaSegmenta;
    // roZemlje = req.body.roZemlje;
    // dl = req.body.dl;
    // granicaUdaljenostiOdUzemljivaca = req.body.granicaUdaljenostiOdUzemljivaca;
    // korakMrezeNaZemlji = req.body.korakMrezeNaZemlji;
    // Rcoveka = req.body.Rcoveka;
    // Dstopala = req.body.Dstopala;
    // rotuc = req.body.rotuc;
    // ltuc = req.body.ltuc;

    //--------------------------------------------------------------


    //--------------------------- test ---------------------------------------------

    IuzemljivacaEff = 2.97;
    duzinaSegmenta = 0.1;
    roZemlje = 50;
    dl = 0.01;
    granicaUdaljenostiOdUzemljivaca = 45;
    korakMrezeNaZemlji = 0.5;
    Rcoveka = 1000;
    Dstopala = 0.16;
    rotuc = 2000;
    ltuc = 0;

    //------------------------ kraj testa -------------------------------------------


    Rstopala = roZemlje / (2 * Dstopala);
    Stuc = Math.pow((Dstopala / 2), 2) * Math.PI;
    Rt = rotuc * ltuc / Stuc;

    const url = "files/" + 'ulazni_fajl_primer.txt-1593012373244.txt';

    fs.readFile(url, (error, data) => {
        if (error) {
            throw error
        }

        let rows = data.toString().split("\n");
        let n = rows.length;
        for(let i = 0; i < n; i++) {
            if (rows[i] == '') {
                n = n-1;
            }
        }

        fileMatrix = mathjs.zeros(n, 6);

        for (let i = 0; i < n; i++) {
            let rowData = rows[i].trimRight();
            rowData = rowData.toString().split("\t");
            for (let j = 0; j < 6; j++) {
                data = parseFloat(rowData[j]);
                fileMatrix.subset(mathjs.index(i, j), data);
            }   
        }

        uzemljivac = citanjePU.citanjePodatakaUzemljivac(fileMatrix);         //radi

        uzemljivac.I = IuzemljivacaEff;      //radi
        
        uzemljivac = uzemljivacRuM.uzemljivacRuMatricaSaLikovima(uzemljivac, roZemlje, dl);   //radi - proveriti tacnost
        
        XYZtackeNaPovrsini = mrezaTacaka.mrezaTacakaNaPovrsiniIPravci1i2(uzemljivac, granicaUdaljenostiOdUzemljivaca, korakMrezeNaZemlji);  //radi - proveriti tacnost
        
        uzemljivac.Ru = mathjs.re(uzemljivac.Ru);                   
        uzemljivac.RuMatrica = mathjs.re(uzemljivac.RuMatrica);

        uzemljivac.U = mathjs.multiply(uzemljivac.Ru, uzemljivac.I);    //radi - matrica 1x1

        RuMatricaInverzna = mathjs.inv(uzemljivac.RuMatrica);
        cinilac = mathjs.multiply(RuMatricaInverzna, uzemljivac.I1);
        uzemljivac.Ivektor = mathjs.multiply(cinilac, uzemljivac.U);
    
        pravacI = potencijalPravca.potencijalPravcaTacakaSaLikovima(uzemljivac, XYZtackeNaPovrsini.pravacI, roZemlje, Rcoveka, Rstopala, Rt);   //radi - proveriti tacnost

        res.status(200).json({
            uzemljivac: uzemljivac,
            XYZtackeNaPovrsini: XYZtackeNaPovrsini,
            pravacI: pravacI
        });
    })     //end fs.read()

});



module.exports = router;