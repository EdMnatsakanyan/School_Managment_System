const prisma = require("../prisma/prisma");

const scheduleService = {
    findAll: async () => {
        return await prisma.Schedule.findMany({
            include: {
                class: true,
                subject: {
                    include: {teacher: true}
                }
            }
        })
    },

    findOne: async (id) => {
        const finded = await prisma.Schedule.findUnique({
            where: {id},
            include: {
                class: true,
                subject: {
                    include: {teacher: true}
                }
            }
        })
        if(!finded){
            throw new Error('No schedule with that id')
        }
        return finded
    },

    teachersSchedules: async (teacher_id) => {
        const finded = await prisma.Teacher.findUnique({
            where: {id: teacher_id},
            include: {subjects: true}
        })
        if(!finded) throw new Error('No teacher with that id')

        return await prisma.Schedule.findMany({
            where: {
                OR: finded.subjects.map(s => ({subject_id: s.id}))
            },
            include: {class: true, subject: true}
        })
    },

    create: async (schedule) => {
        const {day, number, class_id, subject_id} = schedule

        const findedClass = await prisma.Class.findUnique({where: {id: class_id}})
        const findedSubject = await prisma.Subject.findUnique({where: {id: subject_id}})

        if(!findedClass){
            throw new Error('No class with that id')
        } else if(!findedSubject) {
            throw new Error('No schedule with that id')
        }

        const schedules = await prisma.Schedule.findMany({
            where: {day, number},
            include: {
                subject: {
                    select: {teacher_id: true}
                }
            }
        })
        const {teacher_id} = await prisma.Subject.findUnique({where: {id: subject_id}})

        for(let i = 0; i < schedules.length; ++i){
            if(schedules[i].subject.teacher_id == teacher_id){
                throw new Error('That teacher alreay have class that time')
            } else if(schedules[i].day == day && schedules[i].number == number && schedules[i].class_id == class_id){
                throw new Error('This class already have lesson in that time')
            }
        }

        const newSchedule =  await prisma.Schedule.create({
            data: schedule,
            include: {
                class: true,
                subject: {
                    include:{
                        teacher: true
                    }
                }
            }
        })
        return newSchedule
    },

    update: async (id, schedule) => {
        const findedSchedule = await prisma.Schedule.findUnique({where: {id}})
        if(!findedSchedule) throw new Error('No schedule with that id')
        const {day, number, class_id, subject_id} = {...findedSchedule, ...schedule}
        console.log({...findedSchedule, ...schedule})
        const findedClass = await prisma.Class.findUnique({where: {id: class_id}})
        const findedSubject = await prisma.Subject.findUnique({where: {id: subject_id}})

        if(!findedClass){
            throw new Error('No class with that id')
        } else if(!findedSubject) {
            throw new Error('No schedule with that id')
        }

        const schedules = await prisma.Schedule.findMany({
            where: {day, number},
            include: {
                subject: {
                    select: {teacher_id: true}
                }
            }
        })
        const {teacher_id} = await prisma.Subject.findUnique({where: {id: subject_id}})

        for(let i = 0; i < schedules.length; ++i){
            if(schedules[i].subject.teacher_id == teacher_id){
                throw new Error('That teacher alreay have class that time')
            } else if(schedules[i].day == day && schedules[i].number == number && schedules[i].class_id == class_id){
                throw new Error('This class already have lesson in that time')
            }
        }

        const updatedSchedule =  await prisma.Schedule.update({
            where:{id},
            data: schedule,
            include: {
                class: true,
                subject: {
                    include:{
                        teacher: true
                    }
                }
            }
        })
        return updatedSchedule
    },

    delete: async (id) => {
        const finded = await prisma.Schedule.findUnique({where: {id}})
        if(!finded) throw new Error('No schedule with that id')

        await prisma.Schedule.delete({where: {id}})
        return 'Deleted successfully'
    },
};

module.exports = scheduleService;
