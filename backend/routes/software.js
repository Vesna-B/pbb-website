const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mathjs = require('mathjs');
const Matrix = require('node-matrices');

const geometrija = require('../functions/geometrija');
const citanjePU = require('../functions/citanjePodatakaUzemljivac');

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


//------------------------------------ uzemljivac -----------------------------
// uzemljivac = {
//     element, //niz objekata element
//     elementLik, //niz objekata elementLik
//     brojElemenata, //number
//     RuMatrica, //matrica (brojElemenata, brojeElemenata)
//     Ru, //
//     U,
//     I,
//     Ivektor, //matrica (n, 1) inicijalizovana 0
//     I1 //matrica (n, 1) inicijalizovana 1
// }

// element = {
//     L, //number
//     A, //tacka { x, y, z}
//     B, //tacka
//     C, //niz tacaka, odnosno matrica
//     brojTacakaNaElementu //number
// }

// elementLik = {
//     L, //number
//     A, //tacka
//     B  //tacka
// }

//------------------------------------------------------------------------------------------



//router.post("", multer({ storage: storage }).single("imeFajla"), (req, res, next) => {

router.post("", (req, res, next) => {           //test - vratiti prethodnu liniju, izbrisati ovu
    //let matrix;
    let fileMatrix;
    let uzemljivacDeo;

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

        //matrix = Matrix.zeros(n, 6);
        //console.log(matrix);                        //test

        fileMatrix = mathjs.zeros(n, 6);
        console.log(fileMatrix);

        for (let i = 0; i < n; i++) {
            let rowData = rows[i].trimRight();
            rowData = rowData.toString().split("\t");

            for (let j = 0; j < 6; j++) {
                //matrix = matrix.replace(i, j, rowData[j]);
                fileMatrix.subset(mathjs.index(i, j), rowData[j]);
            }   
        }

        //console.log(matrix);        //test - problem

        // console.log("After reading \n");
        // console.log(fileMatrix);

        uzemljivacDeo = citanjePU.citanjePodatakaUzemljivac(fileMatrix);
        //console.log(uzemljivacDeo);       //test
        

    })

});



module.exports = router;