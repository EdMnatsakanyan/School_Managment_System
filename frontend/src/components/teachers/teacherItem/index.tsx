import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import { ITeacher } from "../../../types";
import { useNavigate } from "react-router-dom";

interface IProps {
  teacher: ITeacher;
}

export default function TeacherItem({ teacher }: IProps) {
    const navigate = useNavigate()

  return (
    <Card
        onClick={() => navigate('/teacher/' + teacher.id)}
      sx={{
        maxWidth: 450,
        width: "100%",
        mx: "auto",
        p: 2,
        boxShadow: 4,
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64, fontSize: 24 }}>
          {teacher.name[0]} {teacher.surname[0]}
        </Avatar>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {teacher.name} {teacher.surname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {teacher.subjects?.length
              ? `Subjects: ${teacher.subjects.map((sub) => sub.title).join(", ")}`
              : "No subjects assigned"}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
}
