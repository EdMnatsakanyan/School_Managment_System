import { useQuery } from "@apollo/client";
import { IClass } from "../../types";
import { GET_CLASSES } from "./queries";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Card,
  Stack,
  Avatar,
  IconButton, Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import AddClassModal from "./class/addClassModal";

interface ClassesData {
  classes: IClass[];
}

export default function Classes() {
  const { loading, error, data, refetch } = useQuery<ClassesData>(GET_CLASSES);
  const classes = data?.classes;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" color="error" textAlign="center" mt={4}>
        Something went wrong. Please try again.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <SchoolIcon fontSize="large" />
        Classes
      </Typography>
      
      <Button variant="text" color="primary"  onClick={() => setIsOpen(true)}>
        Add Class
      </Button>

      <AddClassModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />

      <Stack spacing={2}>
        {classes?.slice().sort((a, b) => Number(a.level) - Number(b.level)).map((c) => (
          <Card
            key={c.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: 3,
              transition: "0.3s",
              borderRadius: 3,
              padding: 2,
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
                backgroundColor: "action.hover",
              },
            }}
            onClick={() => navigate("/classes/" + c.id)}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "secondary.main", fontWeight: "bold" }}>
                {c.level}
                {c.letter}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Class {c.level}
                  {c.letter}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.pupils.length} Pupils
                </Typography>
              </Box>
            </Stack>
            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
