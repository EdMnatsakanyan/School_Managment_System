const classService = require("../../services/classService");

const classResolver = {
  Query: {
    classes: async () => {
      try {
        return await classService.findAll();
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    class: async (_, { id }) => {
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      try {
        return await classService.findOne(Number(id));
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
  },
  
  Mutation: {
    createClass: async (_, { input }) => {
      const { room_number, level, letter } = input;
      if (level > 12 || level < 1) {
        throw new Error("Level can be 1-12");
      } else if (letter.length !== 1) {
        throw new Error("Letter must be a char");
      }

      try {
        return await classService.create({
          room_number: Number(room_number),
          level: Number(level),
          letter,
        });
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    updateClass: async (_, { id, input }) => {
      const { room_number, level, letter } = input;
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      if (level && (level > 12 || level < 1)) {
        throw new Error("Level can be 1-12");
      } else if (letter && letter.length !== 1) {
        throw new Error("Letter must be a char");
      }

      try {
        return await classService.update(Number(id), {
          room_number,
          level,
          letter,
        });
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
    deleteClass: async (_, { id }) => {
      if (!id || !Number.isInteger(Number(id))) {
        throw new Error("Wrong id format");
      }
      try {
        return await classService.delete(Number(id));
      } catch (err) {
        throw new Error(err.message || "Something went wrong");
      }
    },
  },
};

module.exports = classResolver;
