export enum ErrorType {
    Fatal = 'Fatal',
    User = 'User',
    Conflict = 'Conflict',
}

export type InternalServerError = {
    code: 'InternalServerError';
    codeNumber: 0;
    type: ErrorType.Fatal;
    message: string;
};
