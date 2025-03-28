const prisma = require("../prisma/prisma");

const subjectService = {
  findAll: async () => {
    return prisma.Subject.findMany({
      include: {
        teacher: true,
      },
    });
  },

  findOne: async (id) => {
    const finded = await prisma.Subject.findUnique({
      where: { id },
      include: {
        teacher: true,
      },
    });
    if (!finded) throw new Error("No subject with that id");
    return finded;
  },

  create: async (subject) => {
    const findedTeacher = await prisma.Teacher.findUnique({
      where: { id: Number(subject.teacher_id) },
    });
    if (!findedTeacher) throw new Error("No teacher with that id");

    const finded = await prisma.Subject.findFirst({where: {title: subject.title}})
    if(finded) throw new Error('This subject alreay exists !')

    const newSubject = await prisma.Subject.create({
      data: subject,
      include: {
        teacher: true,
      },
    });
    return newSubject;
  },

  update: async (id, subject) => {
    const finded = await prisma.Subject.findUnique({
      where: { id },
    });
    if (!finded) throw new Error("No subject with that id");

    if (subject.teacher_id) {
      const findedTeacher = await prisma.Teacher.findUnique({
        where: { id: Number(subject.teacher_id) },
      });
      if (!findedTeacher) throw new Error("No teacher with that id");
    }

    const updatedSubject = await prisma.Subject.update({
      where: { id },
      data: subject,
      include: {
        teacher: true,
      },
    });
    return updatedSubject;
  },

  delete: async (id) => {
    const finded = await prisma.Subject.findUnique({
      where: { id },
    });
    if (!finded) throw new Error("No subject with that id");

    await prisma.Subject.delete({ where: { id } });
    return "Deleted successfully";
  },
};

module.exports = subjectService;
