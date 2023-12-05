export interface HeaderProps {
    name: string
}

export interface ContentProps {
    courseParts: courseParts[]
}

export interface courseParts {
    name: string,
    exerciseCount: number
}

export interface TotalProps {
    totalExercises: number
}