import React from 'react';
import { ContentType } from '../types/types';

const Total = ({ courseParts }: ContentType) => {
    return (
        <div>
            <p>
                Number of exercises{' '}
                {courseParts.reduce(
                    (sum, course) => sum + course.exerciseCount,
                    0
                )}
            </p>
        </div>
    );
};

export default Total;
