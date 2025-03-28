export interface ITeacher {
  id: string;
  name: string;
  surname: string;
  subjects?: ISubject[];
}

export interface ISubject {
  id: string;
  title: string;
  teacher: ITeacher;
}

export interface ISchedule {
  id: string;
  day: string;
  number: number;
  class: IClass;
  subject: ISubject;
}

export interface IPupil {
  id: string;
  name: string;
  surname: string;
  class: IClass;
}

export interface IClass {
  id: string;
  level: number;
  letter: string;
  room_number: number;
  pupils: IPupil[];
  schedules: ISchedule[];
}
