const Matrix = require('node-matrices');
const mathjs = require('mathjs');

const rastojanje2TackeU3D = (A, B) => {
    d = Math.sqrt(Math.pow((A.x - B.x), 2) + Math.pow((A.y - B.y), 2) + Math.pow((A.z - B.z), 2));
    return d;
}


// const geometrija_Rastojanje2TackeU2D = (A, B) => {
//     d = Math.sqrt(Math.pow((A.x - B.x), 2) + Math.pow((A.y - B.y), 2));
//     return d;
// }


const tackeCnaDuziABu3D = (A, B, broj_tacaka) => {
    AB = rastojanje2TackeU3D(A, B);
    korak = AB / (broj_tacaka - 1);                 //matlab: linspace(0, AB, broj_tacaka) ukljucuje 0 i AB
    AC = new Array();
    for (let i = 0; i < broj_tacaka; i++) {
        AC[i] = i * korak;
    }
    CB = new Array();
    for (let i = 0; i < broj_tacaka; i++) {
        CB[i] = AB - AC[i];
    }

    lambdaAB = new Array();        // lambdaAB = zeros(size(AC))
    for (let i = 0; i < broj_tacaka; i++) {
        lambdaAB[i] = 0
    }

    // C = Matrix.zeros(broj_tacaka, 3);               // C = zeros(length(lambdaAB), 3)
    C = mathjs.zeros(broj_tacaka, 3);
    //console.log(C);
    
    for (let i = 0; i < broj_tacaka; i++) {
        let n = 0;
        if (i == broj_tacaka) {
            n = AC[i] / (Math.pow(10, -50));
            //console.log("if n " + n);
        }
        else {
            n = AC[i] / CB[i];
            //console.log("else n " + n)
        }
        lambdaAB[i] = n;
        x1 = A.x + lambdaAB[i] * B.x;
        x2 = 1 + lambdaAB[i];
        //console.log(x1);
        //console.log(x2);
        x = x1 / x2;
        //console.log("Izrazi");
        // console.log(A.x + lambdaAB[i] * B.x);
        // console.log(lambdaAB[i] * B.x)
        // console.log(1 + lambdaAB[i]);
        // console.log(A.x / B.x)



        //console.log("x = " + x)
        //console.log("\n")
        y = (A.y + lambdaAB[i] * B.y) / (1 + lambdaAB[i]);
        z = (A.z + lambdaAB[i] * B.z) / (1 + lambdaAB[i]);

        //console.log("x = " + x + " y = " + y + " z = " + z);
        
        C.subset(mathjs.index(i, 0), x);
        C.subset(mathjs.index(i, 1), y);
        C.subset(mathjs.index(i, 2), z);
        // C = C.replace(i, 0, x);
        // C = C.replace(i, 1, y);
        // C = C.replace(i, 2, z);
    }

    // nesto = -3.79-1.866716417910448;
    // console.log(nesto);
    // nestoKolicnik = nesto / 1.492537313432836
    // console.log(nestoKolicnik);

    //console.log(C);
    return C;
}


//exports.geometrija_Rastojanje2TackeU2D = geometrija_Rastojanje2TackeU2D;

exports.rastojanje2TackeU3D = rastojanje2TackeU3D;
exports.tackeCnaDuziABu3D = tackeCnaDuziABu3D;