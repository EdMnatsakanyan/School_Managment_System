import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SUBJECT, GET_SUBJECTS } from "./queries";
import { ISubject } from "../../types";
import { useState } from "react";
import AddSubjectModal from "./addSubjectModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface SubjectsData {
  subjects: ISubject[];
}

export default function Subjects() {
  const { data, refetch } = useQuery<SubjectsData>(GET_SUBJECTS);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [deleteSubject] = useMutation(DELETE_SUBJECT);
  const [deletedId, setDeletedId] = useState<number | null>(null);

  const handleDelete = async () => {
    if (!deletedId) return;
    try {
      await deleteSubject({
        variables: { id: Number(deletedId) },
      });
      setDeletedId(null);
      refetch();
      setIsDeleteOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Subjects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsOpen(true)}
        >
          Add Subject
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {data?.subjects.map((subject) => (
          <Paper key={subject.id} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6">{subject.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Teacher: {subject.teacher.name} {subject.teacher.surname}
              </Typography>
            </Box>
            <IconButton
              color="error"
              onClick={() => {
                setIsDeleteOpen(true);
                setDeletedId(Number(subject.id));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Box>

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AddSubjectModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
    </Box>
  );
}
