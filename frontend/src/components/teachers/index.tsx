import { useLazyQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { SEARCH_TEACHERS } from "./queries";
import { ITeacher } from "../../types";
import TeacherItem from "./teacherItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Teachers() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [teachers, setTeachers] = useState<ITeacher[] | null>(null);
  const [searchTeachers, { loading, error }] = useLazyQuery(SEARCH_TEACHERS);
  const navigate = useNavigate();
  const t = useRef<number | null>(null);

  useEffect(() => {
    if (t.current) clearTimeout(t.current);
    t.current = window.setTimeout(() => {
      searchTeachers({ variables: { string: searchInput } })
        .then((res) => setTeachers(res.data.searchTeacher))
        .catch((err) => console.log(err));
    }, 600);
  }, [searchInput]);

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
        Something went wrong
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

      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search Teachers"
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: 2,
            boxShadow: 2,
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
        {teachers?.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Stack>
    </Container>
  );
}
