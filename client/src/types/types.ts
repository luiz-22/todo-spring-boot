export type Id = string | number;

export type Task = {
    id: Id;
    note: string;
    done: boolean;
};