const prisma = require("../prisma/prisma");

const teacherService = {
    findAll: async () => {
        return await prisma.Teacher.findMany({
            include: { subjects: true }
        });
    },
    findOne: async (id) => {
        const teacher = await prisma.Teacher.findUnique({
            where: { id: Number(id) },
            include: { subjects: true },
        });
        if (!teacher) throw new Error("No teacher with that ID");
        return teacher;
    },
    search: async (string) => {
        return await prisma.Teacher.findMany({
            where: {
                OR: [
                    {name: {contains: string}},
                    {surname: {contains: string}}
                ]
            },
            include: {
                subjects: true
            }
        })
    },
    create: async (teacher) => {
        return await prisma.Teacher.create({
            data: teacher,
            include: { subjects: true }
        });
    },
    update: async (id, teacher) => {
        const finded = await prisma.Teacher.findUnique({
            where: { id: Number(id) },
        });
        if (!finded) throw new Error("No teacher with that ID");

        return await prisma.Teacher.update({
            where: { id: Number(id) },
            data: { ...teacher },
            include: { subjects: true },
        });
    },
    delete: async (id) => {
        const finded = await prisma.Teacher.findUnique({
            where: { id: Number(id) },
            include: { subjects: true },
        });
        if (!finded) throw new Error("No teacher with that ID");
        if (finded.subjects.length > 0) {
            throw new Error("Cannot delete teacher with assigned subjects");
        }

        await prisma.Teacher.delete({ where: { id: Number(id) } });
        return "Deleted successfully";
    }
};

module.exports = teacherService;
