import React from 'react';
import { ContentType } from '../types/types';

const Total = ({ courseParts }: ContentType) => {
    return (
        <div>
            <span>
                Number of exercises{' '}
                {courseParts.reduce(
                    (sum, course) => sum + course.exerciseCount,
                    0
                )}
            </span>
        </div>
    );
};

export default Total;
