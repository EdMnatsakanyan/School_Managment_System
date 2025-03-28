import { useMutation, useQuery } from "@apollo/client";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ISubject } from "../../../../types";
import { ADD_SCHEDULE, GET_SUBJECTS } from "../../queries";

interface IProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  class_id: number
  refetch:() => void
}

interface SubjectsData {
  subjects: ISubject[];
}

export default function AddScheduleModal({ isOpen, setIsOpen, class_id, refetch }: IProps) {
  const { data } = useQuery<SubjectsData>(GET_SUBJECTS);
  const subjects = data?.subjects;
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const [day, setDay] = useState<string>(days[0]);
  const [number, setNumber] = useState<number>(1);
  const [subject, setSubject] = useState<number | null>(null);
    const [addSchedule, {error}] = useMutation(ADD_SCHEDULE)

  useEffect(() => {
    if (subjects?.length) {
      setSubject(Number(subjects[0].id));
    }
  }, [subjects]);

  const handleAdd = async() => {
        try {
            await addSchedule({variables: {day, number, subject_id: subject, class_id}})
            refetch()
            setIsOpen(false)
        } catch(err){
            
        }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2} textAlign="center">
          Add New Class
        </Typography>

        <Box mb={2}>
          <Typography variant="body1" gutterBottom>
            Subject
          </Typography>
          <Select
            fullWidth
            value={subject ?? ""}
            onChange={(e) => setSubject(Number(e.target.value))}
            displayEmpty
            renderValue={(value) =>
              value
                ? subjects?.find((s) => Number(s.id) === value)?.title
                : "Select a subject"
            }
          >
            {subjects?.map((s) => (
              <MenuItem key={s.id} value={Number(s.id)}>
                {s.title}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" gutterBottom>
            Day
          </Typography>
          <Select
            fullWidth
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {days.map((d) => (
              <MenuItem key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box mb={2}>
          <Typography variant="body1" gutterBottom>
            Number
          </Typography>
          <Select
            fullWidth
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            {error ? (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {error.message}
                </Typography>
            ) : (
                <Box sx={{ height: 16 }} /> // Пустой блок, чтобы сохранить отступ
            )}
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Add
            </Button>
        </Box>
      </Box>
    </Modal>
  );
}
