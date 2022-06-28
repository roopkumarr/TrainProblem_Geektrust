const charStringMatch = () => {
    let baseString = "Hi how are you";
    let findString = "hi";
    baseString = baseString.split(" ").join("");
    findString = findString.split(" ").join("");
    // check the length of find string and repetation of each char
    // console.log("baseString ====",baseString.length);
    // To make it case insencitive
    findString.toLowerCase();
    baseString.toLowerCase();
    if (baseString.length > findString.length) {
        let findcount = {};
        let basecount = {};
        for (let c of findString)
            findcount[c] ? findcount[c]++ : findcount[c] = 1;
        for (let c of baseString)
            basecount[c] ? basecount[c]++ : basecount[c] = 1;
        let equalflag = true;
        console.log("findcount====",findcount);
        console.log("basecount====",basecount);
        for (let c in findcount) {
            // console.log(basecount[c] ,"::::",findcount[c]);
            if (findcount[c] != basecount[c]) {
                equalflag = false;
                break;
            }
        }
        console.log("result :", equalflag);
    } else
        console.log("result :", false);
}

charStringMatch()