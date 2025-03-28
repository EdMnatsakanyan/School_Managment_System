import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_CLASS, GET_CLASS_F } from "../queries";
import { IClass } from "../../../types";
import {
  Box,
  CircularProgress,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import { useState } from "react";
import AddScheduleModal from "./addScheduleModal";
import UpdateClass from "./updateClassModal";

interface ClassData {
  class: IClass;
}

export default function Class() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery<ClassData>(
    GET_CLASS_F(Number(id))
  );
  const [deleteClass] = useMutation(DELETE_CLASS);
  const navigate = useNavigate();
  const Class = data?.class;

  const handleDelete = async () => {
    try {
      await deleteClass({ variables: { id: Class?.id } });
      refetch();
      navigate("/classes");
      setDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
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
    <Box sx={{ padding: 4 }}>
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Delete Class</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this class?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={() => setDeleteModal(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateClass
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        Class={Class as IClass}
        refetch={refetch}
      />

      <Box display={'flex'} gap={'30px'} paddingLeft={'42%'}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setUpdateModal(true)}
      >
        Update
      </Button>
      <Button
      sx={{background: 'red'}}
        variant="contained"
        color="primary"
        onClick={() => setDeleteModal(true)}
      >
        Delete
      </Button>
      </Box>

      <Typography
        variant="h3"
        paddingLeft={'250px'}
        gutterBottom
        color="primary"
        fontWeight="bold"
      >
        {Class?.level} {Class?.letter}
      </Typography>

      <Box display="flex" justifyContent="space-between" gap={4}>
        <Box
          flex={1}
          p={3}
          component={Card}
          elevation={6}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
            }}
          >
            {Class?.pupils?.length} Pupils
          </Typography>

          <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 1 }}>
            {Class?.pupils?.map((pupil, i) => (
              <Box
                onClick={() => navigate('/pupils/' + pupil.id)}
                key={pupil.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "8px",
                  backgroundColor: i % 2 === 0 ? "#f0f0f0" : "white",
                  boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                  mb: 1,
                }}
              >
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  {pupil.name.charAt(0)}
                </Avatar>
                <Typography variant="body1" fontWeight="500">
                  {i + 1}. {pupil.name} {pupil.surname}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "grey.400", borderWidth: 2 }}
        />

        <Box
          flex={1}
          p={3}
          component={Card}
          elevation={6}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Schedules
          </Typography>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "absolute",
              bottom: 30,
              right: 30,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => setIsOpen(true)}
          >
            +
          </Fab>
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (day) => (
              <Box
                key={day}
                mb={3}
                sx={{
                  padding: "16px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="body1" color="primary" fontWeight="bold">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>
                {Class?.schedules
                  ?.filter((s) => s.day === day)
                  .sort((a, b) => a.number - b.number)
                  .map((schedule) => (
                    <Card
                      key={schedule.id}
                      sx={{
                        marginBottom: 1,
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {schedule.number} - {schedule.subject.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {schedule.subject.teacher.name}{" "}
                          {schedule.subject.teacher.surname}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            )
          )}

          <AddScheduleModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            class_id={Number(Class?.id)}
            refetch={refetch}
          />
        </Box>
      </Box>
    </Box>
  );
}
