const scheduleService = require("../../services/scheduleService");

const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const scheduleResolver = {
    Query: {
        schedules: async () => {
            try {
                return await scheduleService.findAll()
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        },

        schedule: async (_, { id }) => {
            try {
                return await scheduleService.findOne(Number(id))
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        },

        teachersSchedules: async(_, {teacher_id}) => {
            try {
                return await scheduleService.teachersSchedules(Number(teacher_id))
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        }
    },

    Mutation: {
        createSchedule: async (_, { input }) => {
            let {day, number, class_id, subject_id} = input
            number = Number(number)
            class_id = Number(class_id)
            subject_id = Number(subject_id)

            if(number < 1 || number > 10) {
                throw new Error('Number can be 1-10')
            }
            if(class_id < 0 || subject_id < 0){
                throw new Error('Id cant be negative')
            }
            day = day.toLowerCase()
            if(!weekdays.includes(day)) throw new Error('Weekdays are monday-friday')
            try {
                return await scheduleService.create({day, class_id, subject_id, number})
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        },

        updateSchedule: async (_, { id, input }) => {
            let {day, number, class_id, subject_id} = input
            number = Number(number)
            class_id = Number(class_id)
            subject_id = Number(subject_id)

            if(number && (number < 1 || number > 10)) {
                throw new Error('Number can be 1-10')
            }
            if(class_id && (class_id < 0 || subject_id < 0)){
                throw new Error('Id cant be negative')
            }
            day = day.toLowerCase()
            if(day && !weekdays.includes(day)) throw new Error('Weekdays are monday-friday')
            
            try {
                return await scheduleService.update(Number(id), input)
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        },

        deleteSchedule: async (_, { id }) => {
            try {
                return await scheduleService.delete(Number(id))
            } catch(err) {
                throw new Error(err.message || 'Something went wrong')
            }
        },
    }
};

module.exports = scheduleResolver;
