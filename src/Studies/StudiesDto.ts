export interface StudiesDto {
    id: number;
    title: string;
}

export interface CreateStudiesDto {
    title: string;
}

export interface UpdateStudiesDto {
    title?: string;
}