export interface HeaderProps {
    name: string
}

export interface ContentProps {
    courseParts: CoursePart[]
}

export interface courseParts {
    name: string,
    exerciseCount: number
}

export interface TotalProps {
    totalExercises: number
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartBaseDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartRequirement extends CoursePartBaseDescription {
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement;