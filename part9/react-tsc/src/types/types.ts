interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescriptivePartBase extends CoursePartBase {
    description: string;
}
interface CourseNormalPart extends CourseDescriptivePartBase {
    type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}
interface CourseSubmissionPart extends CourseDescriptivePartBase {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptivePartBase {
    type: 'special';
    requirements: string[];
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

export type ContentType = {
    courseParts: CoursePart[];
};

export type TotalType = {
    courseParts: CoursePart[];
};

export type PartType = {
    courseParts: CoursePart[];
};
