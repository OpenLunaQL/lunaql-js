export type InsertOptions = {
    unique: string[];
    timestamp: boolean;
} | {
    unique: string[];
} | {
    timestamp: boolean;
};
