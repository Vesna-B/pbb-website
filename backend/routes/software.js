const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mathjs = require('mathjs');

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
            .join("-")
            .split(".txt");
        cb(null, name[0] + "-" + Date.now() + "." + "txt");
    }
});



router.post("", multer({ storage: storage }).single("imeFajla"), (req, res, next) => {

    let fileMatrix;
    let uzemljivac;
    let XYZtackeNaPovrsini;
    let pravacI;

    IuzemljivacaEff = parseFloat(req.body.IuzemljivacaEff);
    roZemlje = parseFloat(req.body.roZemlje);
    dl = parseFloat(req.body.dl);
    granicaUdaljenostiOdUzemljivaca = parseFloat(req.body.granicaUdaljenostiOdUzemljivaca);
    korakMrezeNaZemlji = parseFloat(req.body.korakMrezeNaZemlji);
    Rcoveka = parseFloat(req.body.Rcoveka);
    Dstopala = parseFloat(req.body.Dstopala);
    rotuc = parseFloat(req.body.rotuc);
    ltuc = parseFloat(req.body.ltuc);
 
    Rstopala = roZemlje / (2 * Dstopala);
    Stuc = Math.pow((Dstopala / 2), 2) * Math.PI;
    Rt = rotuc * ltuc / Stuc;

    const url = "files/" + req.file.filename;

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

        uzemljivac = citanjePU.citanjePodatakaUzemljivac(fileMatrix);         

        uzemljivac.I = IuzemljivacaEff;      
        
        uzemljivac = uzemljivacRuM.uzemljivacRuMatricaSaLikovima(uzemljivac, roZemlje, dl);   
        
        XYZtackeNaPovrsini = mrezaTacaka.mrezaTacakaNaPovrsiniIPravci1i2(uzemljivac, granicaUdaljenostiOdUzemljivaca, korakMrezeNaZemlji);  //radi - proveriti tacnost
        
        uzemljivac.Ru = mathjs.re(uzemljivac.Ru);                   
        uzemljivac.RuMatrica = mathjs.re(uzemljivac.RuMatrica);

        uzemljivac.U = mathjs.multiply(uzemljivac.Ru, uzemljivac.I);   

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