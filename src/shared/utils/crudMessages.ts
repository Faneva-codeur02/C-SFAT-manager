export function crudMessages(entity: string) {

    return {

        create: {

            loadingMessage: `Création de ${entity}...`,

            successMessage: `${entity} créé avec succès.`,

            errorMessage: `Impossible de créer ${entity}.`,

        },

        update: {

            loadingMessage: `Modification de ${entity}...`,

            successMessage: `${entity} modifié avec succès.`,

            errorMessage: `Impossible de modifier ${entity}.`,

        },

        delete: {

            loadingMessage: `Suppression de ${entity}...`,

            successMessage: `${entity} supprimé avec succès.`,

            errorMessage: `Impossible de supprimer ${entity}.`,

        },

    };

}