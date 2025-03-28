const teacherService = require("../../services/teaсherService")

const teacherResolver = {
    Query: {
        teachers: async () => {
            try {
                return await teacherService.findAll();
            } catch (err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },
        teacher: async (_, { id }) => {
            if (!id || !Number.isInteger(Number(id))) {
                throw new Error('Wrong id format');
            }
            try {
                return await teacherService.findOne(id);
            } catch (err) {
                throw new Error(err.message || 'Something went wrong');
            }
        }
    },
    Mutation: {
        createTeacher: async (_, { input }) => {
            const { name, surname } = input;
            if (!name || !surname) {
                throw new Error('Wrong data format');
            }

            if (name.length < 3) {
                throw new Error('Name length must be at least 3');
            } else if (surname.length < 3) {
                throw new Error('Surname length must be at least 3');
            }

            try {
                return await teacherService.create(input);
            } catch (err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },
        updateTeacher: async (_, { id, input }) => {
            const { name, surname } = input;

            if (name && name.length < 3) {
                throw new Error('Name length must be at least 3');
            } else if (surname && surname.length < 3) {
                throw new Error('Surname length must be at least 3');
            }

            if (!id || !Number.isInteger(Number(id))) {
                throw new Error('Wrong id format');
            }

            try {
                return await teacherService.update(id, input);
            } catch (err) {
                throw new Error(err.message || 'Something went wrong');
            }
        },
        deleteTeacher: async (_, { id }) => {
            if (!id || !Number.isInteger(Number(id))) {
                throw new Error('Wrong id format');
            }

            try {
                return await teacherService.delete(id);
            } catch (err) {
                throw new Error(err.message || 'Something went wrong');
            }
        }
    }
};

module.exports = teacherResolver;
