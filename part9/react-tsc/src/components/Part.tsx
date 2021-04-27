import React from 'react';
import { PartType } from '../types/types';

const Part = ({ courseParts }: PartType) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    return (
        <div>
            <p>===================================</p>
            {courseParts.map((course, i) => {
                switch (course.type) {
                    case 'normal':
                        return (
                            <div key={i + course.name}>
                                <strong>
                                    {course.name} {course.exerciseCount}
                                </strong>
                                <br></br>
                                <em>{course.description}</em>
                                <br></br>
                                <br></br>
                            </div>
                        );
                    case 'groupProject':
                        return (
                            <div key={i + course.name}>
                                <strong>
                                    {course.name} {course.groupProjectCount}
                                </strong>
                                <br></br>
                                <span>
                                    project exercises {course.exerciseCount}
                                </span>
                                <br></br>
                                <br></br>
                            </div>
                        );
                    case 'submission':
                        return (
                            <div key={i + course.name}>
                                <strong>
                                    {course.name} {course.exerciseCount}
                                </strong>
                                <br></br>
                                <em>{course.description}</em>
                                <br></br>
                                <span>
                                    submit to {course.exerciseSubmissionLink}
                                </span>
                                <br></br>
                                <br></br>
                            </div>
                        );
                    case 'special':
                        return (
                            <div key={i + course.name}>
                                <strong>
                                    {course.name} {course.exerciseCount}
                                </strong>
                                <br></br>
                                <em>{course.description}</em>
                                <br></br>
                                <span>
                                    required skills:{' '}
                                    {course.requirements.join(', ')}
                                </span>
                                <br></br>
                                <br></br>
                            </div>
                        );
                    default:
                        return assertNever(course);
                }
            })}
        </div>
    );
};

export default Part;
