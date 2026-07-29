const DEV = import.meta.env.DEV;

export const logger = {

    info(...args: unknown[]) {

        if (DEV) {

            console.info(...args);

        }

    },

    warn(...args: unknown[]) {

        if (DEV) {

            console.warn(...args);

        }

    },

    error(...args: unknown[]) {

        console.error(...args);

    },

};