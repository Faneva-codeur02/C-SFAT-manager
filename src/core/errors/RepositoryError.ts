import { AppError } from "./AppError";

export class RepositoryError extends AppError {

    constructor(

        message: string,

        code?: string,

        details?: string,

    ) {

        super(message, code, details);

        this.name = "RepositoryError";

    }

}