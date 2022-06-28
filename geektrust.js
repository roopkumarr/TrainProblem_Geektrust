const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Making HYB as the new start point since both the trains meet here
let stationPostHYB = {
    "HYB": 0,
    "NGP": 400,
    "ITJ": 700,
    "BPL": 800,
    "AGA": 2500,
    "NDL": 2700,
    "PTA": 3800,
    "NJP": 4200,
    "GHY": 4700
}
let trainA = [];
let trainB = [];
let mergeTrain = [];


const printBogies = (train, trainData) => {

    let tempEngine = [];
    let tempBoggieDist = [];
    let tempBoggie = ['ARRIVAL'];
    // if (train == "TRAIN_A")
    //     tempEngine = ['ARRIVAL', 'TRAIN_A', 'ENGINE'];
    // if (train == "TRAIN_B")
    //     tempEngine = ['ARRIVAL', 'TRAIN_B', 'ENGINE'];
    for (let i = 0; i < trainData.length; i++) {
        if(i==0||i==1){
            tempBoggie.push(trainData[i]);
        }else if (stationPostHYB.hasOwnProperty(trainData[i].trim())) {
            tempBoggie.push(trainData[i]);
            let trainObj = new Object();
            trainObj = {
                name: trainData[i].trim(),
                id: stationPostHYB[trainData[i].trim()]
            }

            tempBoggieDist.push(trainObj);
            // console.log("trainObj====", trainObj);
        }
    }
    let boggieList = tempEngine.concat(tempBoggie);
    let boggie = boggieList.toString();
    // console.log("boggie====", boggie);
    const bogieList = boggie.split(',').join(' ');
    if (boggieList.length > 3)
        console.log(bogieList.trim());
    else
        console.log('JOURNEY_ENDED');
    return tempBoggieDist;
}

// TODO can be made into array
const printMergeBogies = (train_A, train_B) => {
    let startEngine = ['DEPARTURE', 'TRAIN_AB', 'ENGINE', 'ENGINE'];
    let DeptTrain = train_A.concat(train_B);
    DeptTrain = DeptTrain.sort((a, b) => b.id - a.id);
    let boggieListArray = [];
    for (let i = 0; i < DeptTrain.length; i++) {
        if (DeptTrain[i].id != 0) {
            boggieListArray.push(DeptTrain[i].name);
        }
    }
    let boggieList = startEngine.concat(boggieListArray);
    let boggie = boggieList.toString();
    mergeTrain = boggie.split(',').join(' ');
    mergeTrain = mergeTrain.replace("HYB", "");
    console.log(mergeTrain.trim());
}

const readFile = () => {
    // let fileData = fs.readFileSync('./sample_input/test1.txt', 'utf-8').toString();
    const filename = process.argv[2];
    let fileData = fs.readFileSync(filename, 'utf-8').toString();
    fileData = fileData.toString().split('\r\n');
    let lineOne = fileData[0].toString().split(' ');
    let lineTwo = fileData[1].toString().split(' ');
    trainA = lineOne;
    trainB = lineTwo;
    // console.log("fileData=====>", fileData);
    // console.log("lineOne=====>", lineOne);
    // console.log("lineTwo=====>", lineTwo);
    let train_A = printBogies('TRAIN_A', trainA);
    let train_B = printBogies('TRAIN_B', trainB);
    printMergeBogies(train_A, train_B);
}
readFile();

// app.get('/', (req, res) => {
//     res.send("hello World");
// });

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });