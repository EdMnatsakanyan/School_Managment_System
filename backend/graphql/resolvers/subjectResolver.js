const subjectService = require("../../services/subjectService");

const subjectResolver = {
  Query: {
    subjects: async () => {
      try {
        return await subjectService.findAll();
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    subject: async (_, { id }) => {
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      try {
        return await subjectService.findOne(Number(id));
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
  },

  Mutation: {
    createSubject: async (_, { input }) => {
      const { title, teacher_id } = input;
      if (title.length < 3) {
        throw new Error("Title length must be at least 3");
      } else if (!Number.isInteger(Number(teacher_id))) {
        throw new Error("teacher_id must be an integer");
      }

      try {
        return await subjectService.create({ title, teacher_id });
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    updateSubject: async (_, { id, input }) => {
      const { title, teacher_id } = input;
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      if (title && title.length < 3) {
        throw new Error("Title length must be at least 3");
      } else if (teacher_id && !Number.isInteger(Number(teacher_id))) {
        throw new Error("teacher_id must be an integer");
      }

      try {
        return await subjectService.update(Number(id), { title, teacher_id });
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    deleteSubject: async (_, { id }) => {
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      try {
        return await subjectService.delete(Number(id));
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
  },
};

module.exports = subjectResolver;
