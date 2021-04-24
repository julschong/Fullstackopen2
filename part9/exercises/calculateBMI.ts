const calculateBMI = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal weight';
    } else if (bmi <= 30) {
        return 'Overweight';
    } else if (bmi > 30) {
        return 'Obese';
    }
};

if (process.argv.length < 4) {
    throw new TypeError('Height or Weight Argument Missing!');
}

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
if (height === 0 || weight === 0) {
    throw new TypeError('Height and Weight cannot be zero!');
}

if (!height || !weight) {
    throw new TypeError('Height and Weight needs to be numbers!');
}

console.log(calculateBMI(height, weight));
