export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: string | undefined;
    visibility: Visibility | undefined;
    comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export interface ContentProps {
    diaryList: DiaryEntry[]
}