import React from 'react';
import { ContentType, CoursePart } from '../types/types';

const Content = ({ courseParts }: ContentType) => {
    return (
        <div>
            {courseParts.map((course: CoursePart, i) => {
                return (
                    <p key={i + course.name}>
                        {course.name} {course.exerciseCount}
                    </p>
                );
            })}
        </div>
    );
};

export default Content;
