export type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export type InitialState = {
    tasks: Task[];
    filter: string;
};

export type Reducer = {
    todos: InitialState;
};
