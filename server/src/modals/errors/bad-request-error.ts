import { TSMap } from 'typescript-map';

export class BadRequestError extends Error {
    private static readonly NAME = 'BAD_REQUEST_ERROR';
    private static readonly MESSAGE = 'Invalid inputs';
    public errorCode = 400;
    constructor(message: string = '', details?: TSMap<string, any>) {
        super(message ? message : BadRequestError.MESSAGE);
        this.name = BadRequestError.NAME;
    }
}
