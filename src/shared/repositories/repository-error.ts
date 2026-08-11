export class RepositoryError extends Error {

    public readonly code?: string;

    public readonly details?: string;

    public readonly hint?: string;

    constructor(
        message: string,
        options?: {
            code?: string;
            details?: string;
            hint?: string;
        }
    ) {

        super(message);

        this.name = "RepositoryError";

        this.code = options?.code;

        this.details = options?.details;

        this.hint = options?.hint;

    }

}