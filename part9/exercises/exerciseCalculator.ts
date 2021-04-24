interface ExerciseCalcResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

type NonEmptyArray<T> = [T, ...T[]];

const calculateExercises = (
    dailyHour: NonEmptyArray<number>,
    target: number
): ExerciseCalcResult => {
    let trainingDays = 0;
    let successfulDays = 0;
    let success = true;
    let total = 0;
    dailyHour.forEach((hour) => {
        if (hour >= target) {
            successfulDays++;
        } else {
            success = false;
        }

        if (hour > 0) {
            trainingDays++;
        }
        total += hour;
    });
    let periodLength = dailyHour.length;
    let rating = Math.floor((successfulDays / dailyHour.length) * 2 + 1);
    let ratingDescription = '';
    let average = total / periodLength;

    switch (rating) {
        case 1:
            ratingDescription = 'You need to keep it up!';
            break;
        case 2:
            ratingDescription = 'So so, keep going!';
            break;
        case 3:
            ratingDescription = 'Perfect! go stronger!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
