const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: "John",
        surname: "Doe",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Jane",
        surname: "Smith",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Mark",
        surname: "Johnson",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Emily",
        surname: "Davis",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Laura",
        surname: "Miller",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "James",
        surname: "Wilson",
      },
    }),
    prisma.teacher.create({
      data: {
        name: "Rachel",
        surname: "Moore",
      },
    }),
  ]);

  
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        title: "Mathematics",
        teacher_id: teachers[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Physics",
        teacher_id: teachers[1].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Chemistry",
        teacher_id: teachers[2].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Biology",
        teacher_id: teachers[3].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "English",
        teacher_id: teachers[4].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "History",
        teacher_id: teachers[5].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Geography",
        teacher_id: teachers[6].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Art",
        teacher_id: teachers[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        title: "Physical Education",
        teacher_id: teachers[1].id,
      },
    }),
  ]);


  const classes = await Promise.all([
    prisma.class.create({
      data: {
        room_number: 101,
        level: 10,
        letter: "A",
      },
    }),
    prisma.class.create({
      data: {
        room_number: 102,
        level: 11,
        letter: "B",
      },
    }),
    prisma.class.create({
      data: {
        room_number: 103,
        level: 12,
        letter: "C",
      },
    }),
    prisma.class.create({
      data: {
        room_number: 104,
        level: 9,
        letter: "D",
      },
    }),
  ]);


  const pupils = await Promise.all([
    prisma.pupil.create({
      data: {
        name: "Alice",
        surname: "Johnson",
        class_id: classes[0].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Bob",
        surname: "Williams",
        class_id: classes[0].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Charlie",
        surname: "Brown",
        class_id: classes[1].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "David",
        surname: "Clark",
        class_id: classes[1].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Eva",
        surname: "Adams",
        class_id: classes[2].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Frank",
        surname: "Harris",
        class_id: classes[2].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Grace",
        surname: "Young",
        class_id: classes[3].id,
      },
    }),
    prisma.pupil.create({
      data: {
        name: "Henry",
        surname: "Scott",
        class_id: classes[3].id,
      },
    }),
  ]);


  await prisma.schedule.createMany({
    data: [
      {
        day: "monday",
        number: 1,
        class_id: classes[0].id,
        subject_id: subjects[0].id,
      },
      {
        day: "monday",
        number: 2,
        class_id: classes[0].id,
        subject_id: subjects[1].id,
      },
      {
        day: "tuesday",
        number: 1,
        class_id: classes[1].id,
        subject_id: subjects[2].id,
      },
      {
        day: "tuesday",
        number: 2,
        class_id: classes[1].id,
        subject_id: subjects[3].id,
      },
      {
        day: "wednesday",
        number: 1,
        class_id: classes[2].id,
        subject_id: subjects[4].id,
      },
      {
        day: "wednesday",
        number: 2,
        class_id: classes[2].id,
        subject_id: subjects[5].id,
      },
      {
        day: "thursday",
        number: 1,
        class_id: classes[3].id,
        subject_id: subjects[6].id,
      },
      {
        day: "thursday",
        number: 2,
        class_id: classes[3].id,
        subject_id: subjects[7].id,
      },
      {
        day: "friday",
        number: 1,
        class_id: classes[0].id,
        subject_id: subjects[8].id,
      },
      {
        day: "friday",
        number: 2,
        class_id: classes[0].id,
        subject_id: subjects[3].id,
      },
    ],
  });

  console.log("Seeder data has been inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
