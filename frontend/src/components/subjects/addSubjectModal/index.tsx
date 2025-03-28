import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ITeacher } from "../../../types";
import { ADD_SUBJECT, GET_TEACHERS } from "../../teachers/queries";


interface IProps {
  teacher_id?: number;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  refetch: () => void;
}

interface TeacherData {
  teachers: ITeacher[];
}

export default function AddSubjectModal({
  isOpen,
  setIsOpen,
  refetch,
  teacher_id,
}: IProps) {
  const [subName, setSubName] = useState<string>("");
  const [addSub, { error }] = useMutation(ADD_SUBJECT);
  const { data } = useQuery<TeacherData>(GET_TEACHERS);
  const [teacher, setTeacher] = useState<number>(Number(teacher_id));

  const handleAdd = async () => {
    if(!teacher){
      return
    }
    try {
      await addSub({
        variables: {
          input: {
            title: subName,
            teacher_id: Number(teacher),
          },
        },
      });
      refetch();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Add Subject</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Subject Title"
            variant="outlined"
            fullWidth
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Teacher</InputLabel>
            <Select
              value={teacher}
              onChange={(e) => {
                console.log(e.target.value)
                setTeacher(Number(e.target.value))
              }}
            >
              {data?.teachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name} {t.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="inherit" sx={{color:'red'}}>
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
