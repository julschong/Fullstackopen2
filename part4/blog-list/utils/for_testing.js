const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {

    if (array.length) {
        const reducer = (sum, item) => {
            return sum + item
        }

        return array.reduce(reducer, 0) / array.length
    } else {
        return 0
    }


}

module.exports = {
    palindrome,
    average,
}