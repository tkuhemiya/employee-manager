let letterMap = {
    " ": " ",
    "ka": "ක",
    "k": "ක",
    "ga": "ග",
    "g": "ග",
    "nga": "ඞ",
    "cha": "ච",
    "ch": "ච",
    "ja": "ජ",
    "j": "ජ",
    "tta": "ට",
    "tt": "ට්",
    "dda": "ඩ",
    "dd": "ඩ්",
    "ta": "ත",
    "th": "ත",
    "tha" : "ත",
    "t": "ත්",
    "da": "ද",
    "d": "ද",
    "na": "න",
    "n": "න",
    "pa": "ප",
    "p": "ප",
    "ba": "බ",
    "b": "බ",
    "ma": "ම",
    "m": "ම",
    "ya": "ය",
    "y": "ය",
    "ra": "ර",
    "r": "ර",
    "la": "ල",
    "l": "ල",
    "va": "ව",
    "v": "ව",
    "wa": "ව",
    "w": "ව",
    "sha": "ශ",
    "sh": "ශ",
    "sa": "ස",
    "s": "ස",
    "ha": "හ",
    "h": "හ",
    "ll": "ල්",
    "fa": "ෆ",
    "f": "ෆ්"
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
    textInEnglish = textInEnglish.toLowerCase();
    let textInSinhala = ""
    let i = 0;
    let prevLetter = false

    if (textInEnglish.slice(0, 2) in vowelLetterMap){
        textInSinhala += vowelLetterMap[textInEnglish.slice(0, 2)];
        prevLetter = true;
        i += 2;
    }else if(textInEnglish.slice(0,1) in vowelLetterMap){
        textInSinhala += vowelLetterMap[textInEnglish.slice(0, 1)];
        prevLetter = true;
        i++
    }

    while(i < textInEnglish.length){
        let threeletter = textInEnglish.slice(i, i+3); 
        let twoletter = textInEnglish.slice(i, i+2);
        let oneletter = textInEnglish.slice(i, i+1);

        if(threeletter in letterMap){
            textInSinhala += letterMap[threeletter];
            prevLetter = true;
            i += 3;
        }else if( twoletter in letterMap){
            textInSinhala += letterMap[twoletter];
            prevLetter = true;
            i += 2;
        }else if( oneletter in letterMap){
            textInSinhala += letterMap[oneletter];
            prevLetter = true;
            i += 1;
        }else if(twoletter in vowelMap && prevLetter){
            textInSinhala += vowelMap[twoletter];
            prevLetter = false;
            i += 2;
        }else if(oneletter in vowelMap && prevLetter){
            textInSinhala += vowelMap[oneletter];
            prevLetter = false;
            i += 1;
        }else{
            console.log(`not found ${threeletter, twoletter, oneletter}`);
            i++
        }

    }
        return textInSinhala;
}
