const decodeMorse = function (morseCode) {
    //your code here
    let result = ""

    const morse = {
        ".-": "A",
        "-...": "B",
        "-.-.": "C",
        "-..": "D",
        ".": "E",
        "..-.": "F",
        "--.": "G",
        "....": "H",
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L",
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P",
        "--.-": "Q",
        ".-.": "R",
        "...": "S",
        "-": "T",
        "..-": "U",
        "...-": "V",
        ".--": "W",
        "-..-": "X",
        "-.--": "Y",
        "--..": "Z",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "-----": "0"
    }
    const strArr = morseCode.split(" ")

    strArr.forEach(str => {
        if (str.trim() === "") {
            result = result.concat(" ")
            return
        }
        return result = result.concat(morse[str])
    })

    return result

}

console.log(decodeMorse('.... . -.--   .--- ..- -.. .'))
