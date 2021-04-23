const multiplicator = (
    a: number,
    b: number,
    op: Operation
): number | string => {
    if (op === 'multiply') {
        return a * b;
    } else if (op === 'add') {
        return a + b;
    } else if (op === 'divide') {
        if (b === 0) return "can't divide by 0!";
        return a / b;
    }
};

type Operation = 'multiply' | 'add' | 'divide';

console.log(multiplicator(2, 4, 'add'));
