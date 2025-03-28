import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { ISchedule, ITeacher } from "../../../types";
import { DELETE_TEACHER, GET_TEACHER_F, TEACHERS_SCHEDULES_F } from "../queries";
import { Box, CircularProgress, Typography, Card, CardContent, Stack, Chip, Divider } from "@mui/material";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import AddSubjectModal from "../../subjects/addSubjectModal";

interface TeacherData {
    teacher: ITeacher;
}

interface ScheduleData {
    teachersSchedules: ISchedule[];
}

export default function Teacher() {
    const { id } = useParams();
    const { loading: teachersLoading, error: teachersError, data: teachersData, refetch } = useQuery<TeacherData>(GET_TEACHER_F(Number(id)));
    const { loading: scheduleLoading, error: scheduleError, data: scheduleData } = useQuery<ScheduleData>(TEACHERS_SCHEDULES_F(Number(id)));
    const [deleteTeacher] = useMutation(DELETE_TEACHER)
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const teacher = teachersData?.teacher;
    const schedules = scheduleData?.teachersSchedules;

    const handleDelete = async() => {
        try {
            await deleteTeacher({
                variables: {
                    id
                }
            })
            navigate('/teachers')
        } catch(err){
            console.log(err)
        }
    }

    if (teachersLoading || scheduleLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (teachersError || scheduleError) {
        return (
            <Typography variant="h4" color="error" textAlign="center" mt={4}>
                Something went wrong 
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Card sx={{ maxWidth: 600, mx: "auto", mb: 4, boxShadow: 3 }}>
                <CardContent >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
                            {teacher?.name[0]}{teacher?.surname[0]}
                        </Avatar>
                        <div>
                            <Typography variant="h5" fontWeight="bold">
                                {teacher?.name} {teacher?.surname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {teacher?.subjects?.map(s => s.title).join(", ") || "No subjects assigned"}
                            </Typography>
                        </div>

                        <Button variant="text" color="primary" sx={{color: 'red'}} onClick={handleDelete}>
                            Delete
                        </Button>

                        <Button variant="text" color="primary" sx={{color: 'green'}} onClick={() => setIsOpen(true)}>
                            Add Subject
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Schedules
            </Typography>

            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                <Box key={day} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ textTransform: "capitalize" }}>{day}</Typography>
                    <Divider sx={{ mb: 1 }} />
                    {schedules?.filter(s => s.day === day)
                        .sort((a, b) => a.number - b.number)
                        .map((schedule) => (
                            <Card key={schedule.id} sx={{ mb: 2, boxShadow: 2 }}>
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Chip label={`Lesson ${schedule.number}`} color="primary" size="small" />
                                        <div>
                                            <Typography variant="body1" fontWeight="bold">
                                                Class: {schedule.class.level}{schedule.class.letter}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Subject: {schedule.subject.title}
                                            </Typography>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                </Box>
            ))}
            <AddSubjectModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} teacher_id={Number(teacher?.id)}/>
        </Box>
    );
}
