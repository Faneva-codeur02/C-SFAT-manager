export class AppError extends Error {

    readonly code?: string;

    readonly details?: string;

    constructor(

        message: string,

        code?: string,

        details?: string,

    ) {

        super(message);

        this.name = "AppError";

        this.code = code;

        this.details = details;

    }

}