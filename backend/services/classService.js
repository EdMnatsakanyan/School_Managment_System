const prisma = require("../prisma/prisma");

const classService = {
  findAll: async () => {
    return await prisma.Class.findMany({
      include: {
        pupils: true,
        schedules: {
          include: {
            subject: {
              include: {teacher: true}
            }
          }
        },
      },
    });
  },

  findOne: async (id) => {
    const finded = await prisma.Class.findUnique({
      where: { id },
      include: {
        pupils: true,
        schedules: {
          include: {
            subject: {
              include: {teacher: true}
            }
          }
        },
      },
    });
    if (!finded) {
      throw new Error("No class with that id");
    }
    return finded;
  },

  create: async (classData) => {
    const { room_number, level, letter } = classData;

    const finded = await prisma.Class.findFirst({
      where: {
        level,
        letter,
      },
    });
    if (finded) throw new Error("These class already exists");

    const findedByRoom = await prisma.Class.findFirst({
      where: {
        room_number,
      },
    });
    if (findedByRoom) throw new Error(`Class in room:${room_number} already exists`);

    const newClass = await prisma.Class.create({
      data: { room_number, level, letter },
    });
    return newClass;
  },

  update: async (id, classData) => {
    const { room_number, level, letter } = classData;
    const findedById = await prisma.Class.findUnique({
      where: { id },
    });
    if (!findedById) {
      throw new Error("No class with that id");
    }

    const finded = await prisma.Class.findFirst({
      where: {
        level,
        letter,
      },
    });
    if (finded && finded.id !== id) throw new Error("These class already exists");

    const findedByRoom = await prisma.Class.findFirst({
      where: {
        room_number,
      },
    });
    if (findedByRoom && findedByRoom.id !== id) throw new Error(`Class in room:${room_number} already exists`);

    const updatedClass = await prisma.Class.update({
      where: { id },
      data: classData,
      include: {
        pupils: true,
        schedules: true,
      },
    });

    return updatedClass;
  },

  delete: async (id) => {
    const findedById = await prisma.Class.findUnique({
      where: { id },
    });
    if (!findedById) {
      throw new Error("No class with that id");
    }

    await prisma.Class.delete({
      where: { id },
    });
    return "Deleted successfully";
  },
};

module.exports = classService;
