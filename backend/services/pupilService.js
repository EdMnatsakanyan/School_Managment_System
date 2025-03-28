const prisma = require("../prisma/prisma");

const pupilService = {
    findAll: async () => {
        return await prisma.Pupil.findMany({
            include: {class: true}
        })
    },

    findOne: async (id) => {
        const finded = await prisma.Pupil.findUnique({
            where:{id},
            include: {
                class: true
            }
        })
        if(!finded){
            throw new Error('No pupil with that id')
        }
        return finded
    },

    create: async (pupil) => {
        const findedClass = await prisma.Class.findUnique({where: {id: Number(pupil.class_id)}})
        if(!findedClass){
            throw new Error('No class with that id')
        }
        const newPupil = await prisma.Pupil.create({
            data: pupil,
            include: {
                class: true
            }
        })
        return newPupil
    },

    update: async (id, pupil) => {
        const finded = await prisma.Pupil.findUnique({where: {id}})
        if(!finded){
            throw new Error('No pupil with that id')
        }

        if(pupil.class_id){
            const finded = await prisma.Class.findUnique({where: {id: Number(pupil.class_id)}})
            if(!finded) throw new Error('No class with that id')
        }

        const updatedPupil = await prisma.Pupil.update({
            where: {id},
            data: pupil,
            include: {
                class: true
            }
        })
        return updatedPupil
    },

    delete: async (id) => {
        const finded = await prisma.Pupil.findUnique({where: {id}})
        if(!finded) throw new Error('No pupil with that id')

        await prisma.Pupil.delete({where: {id}})
        return 'Deleted sucessfully'
    },
};

module.exports = pupilService;
