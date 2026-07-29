import {

    contributionRepository,

}

    from "../repositories/contribution.repository";

export const contributionService = {

    async getAll() {

        const {

            data,

            error,

        }

            = await contributionRepository.getAll();

        if (error) {

            throw error;

        }

        return data;

    },

    async delete(id: string) {

        const {

            error,

        }

            = await contributionRepository.delete(id);

        if (error) {

            throw error;

        }

    }
};