export const isEmpty = (object) => {
    return JSON.stringify(object) === '{}'
}