const pupilService = require("../../services/pupilService");

const pupilResolver = {
    Query: {
        pupils: async () => {
            try {
                return await pupilService.findAll()
            } catch(err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },

        pupil: async (_, { id }) => {
            try {
                return await pupilService.findOne(Number(id))
            } catch(err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },
    },

    Mutation: {
        createPupil: async (_, { input }) => {
            const {name, surname, class_id} = input
            if(name.length < 3){
                throw new Error("Pupil's name length must be at least 3")
            } else if(surname.length < 3){
                throw new Error("Pupil's surname length must be at least 3")
            }

            try {
                return await pupilService.create(input)
            } catch(err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },

        updatePupil: async (_, { id, input }) => {
            const {name, surname, class_id} = input
            if(name && name.length < 3){
                throw new Error("Pupil's name length must be at least 3")
            } else if(surname && surname.length < 3){
                throw new Error("Pupil's surname length must be at least 3")
            }

            try {
                return await pupilService.update(Number(id), input)
            } catch(err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },

        deletePupil: async (_, { id }) => {
            try {
                return await pupilService.delete(Number(id))
            } catch(err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },
    }
};

module.exports = pupilResolver;
