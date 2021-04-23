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

console.log(calculateBMI(180, 74));
