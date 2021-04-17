const decodeMorse = function (morseCode) {
    //your code here
    let result = ''

    const morse = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E',
        '..-.': 'F',
        '--.': 'G',
        '....': 'H',
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L',
        '--': 'M',
        '-.': 'N',
        '---': 'O',
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
        '...---...': 'SOS',
        '--..--': ',',
        '.-.-.-': '.',
        '-.-.--': '!',
    }

    const strArr = morseCode.split(' ')

    strArr.forEach((str, i) => {
        if (str === '') {
            if (strArr[i - 1] !== '') {
                result = result.concat(' ')
            }
            return
        }
        return (result = result.concat(morse[str]))
    })

    return result.trim()
}

console.log(decodeMorse('.... . -.--   .--- ..- -.. .'))
