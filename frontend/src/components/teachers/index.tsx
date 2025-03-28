import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Stack, Typography, Container, Button } from "@mui/material";
import { GET_TEACHERS } from "./queries";
import { ITeacher } from "../../types";
import TeacherItem from "./teacherItem";
import { useNavigate } from "react-router-dom";

interface TeachersData {
  teachers: ITeacher[];
}

export default function Teachers() {
  const { loading, error, data } = useQuery<TeachersData>(GET_TEACHERS);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" color="error" textAlign="center" mt={4}>
        Something went wrong 😢
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mt: 4, color: "primary.main" }}
      >
        Our Teachers
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              boxShadow: 6,
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => navigate("/teachers/add")}
        >
          Add Teacher
        </Button>
      </Box>

      <Stack spacing={3} alignItems="center">
        {data?.teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Stack>
    </Container>
  );
}
