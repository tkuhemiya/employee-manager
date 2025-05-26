let letterMap = {
    "ka" : "ක",
    "k" : "ක්",
    "ga" : "ග",
    "cha" : "ච",
    "ja" : "ජ",
    "tta" : "ට",
    "dda" : "ඩ",
    "ta" : "ත",
    "th" : "ත",
    "t" : "ත්",
    "da" : "ද",
    "na" : "න",
    "n" : "න්",
    "pa" : "ප",
    "ba" : "බ",
    "ma" : "ම",
    "m" : "ම්",
    "ya" : "ය",
    "ra" : "ර",
    "r" : "ර",
    "la" : "ල",
    "l" : "ල",
    "va" : "ව",
    "sh" : "ශ",
    "sa" : "ස",
    "ha" : "හ",
    "h" : "හ",
    "fa" : "ෆ",
};

let vowelMap = {
    "a": "ා", 
    "aa": "ැ", 
    "i": "ි",
    "ii": "ී",
    "u": "ු",
    "uu": "ූ",
    "e": "ෙ",
    "ee": "ේ",
    "o": "ො",
    "oo": "ෝ",
};

let vowelLetterMap = {
    "a": 'අ',
    "aa": 'ඇ',
    "i": 'ඉ',
    "ii": 'ඊ',
    "u": 'උ',
    "uu": 'ඌ',
    "e": 'එ',
    "ee": 'ඒ',
    "o": 'ඔ',
    "oo": 'ඕ',
}

export function decoder(textInEnglish) {

    let textInSinhala = ""
    let i = 0;

    if (textInEnglish.slice(0, 2) in vowelLetterMap){
        textInSinhala += vowelLetterMap[textInEnglish.slice(0, 2)];
        i += 2;
    }else if(textInEnglish.slice(0,1) in vowelLetterMap){
        textInSinhala += vowelLetterMap[textInEnglish.slice(0, 1)];
        i++
    }

    while(i < textInEnglish.length){
        let threeletter = textInEnglish.slice(i, i+3); 
        let twoletter = textInEnglish.slice(i, i+2);
        let oneletter = textInEnglish.slice(i, i+1);

        if(threeletter in letterMap){
            textInSinhala += letterMap[threeletter];
            i += 3;
        }else if( twoletter in letterMap){
            textInSinhala += letterMap[twoletter];
            i += 2;
        }else if( oneletter in letterMap){
            textInSinhala += letterMap[oneletter];
            i += 1;
        }else if(twoletter in vowelMap){
            textInSinhala += vowelMap[twoletter];
            i += 2;
        }else if(oneletter in vowelMap){
            textInSinhala += vowelMap[oneletter];
            i += 1;
        }else{
            console.log(`not found ${threeletter, twoletter, oneletter}`);
            i++
        }

    }
        return textInSinhala;
}


console.log(decoder("kamalaa"))
console.log(decoder("amala"))
console.log(decoder("ishan"))
console.log(decoder("heshan"))
