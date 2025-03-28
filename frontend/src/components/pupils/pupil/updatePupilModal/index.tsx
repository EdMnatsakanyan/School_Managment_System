import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack } from "@mui/material";
import { IClass, IPupil } from "../../../../types";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CLASSES } from "../../../classes/queries";
import { UPDATE_PUPIL } from "../../queries";

interface IProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  refetch: (p:IPupil) => void;
  pupil: IPupil;
}

export default function UpdatePupilModal({ isOpen, setIsOpen, refetch, pupil }: IProps) {
  const [classes, setClasses] = useState<IClass[] | null>(null);
  const [newName, setNewName] = useState<string>(pupil.name);
  const [newSurname, setNewSurname] = useState<string>(pupil.surname);
  const [newClass, setNewClass] = useState<string>(pupil.class.id.toString());
  const [getClasses] = useLazyQuery(GET_CLASSES);
  const [updatePupil] = useMutation(UPDATE_PUPIL);

  useEffect(() => {
    getClasses()
      .then((res) => setClasses(res.data.classes))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await updatePupil({
        variables: {
          id: pupil.id,
          input: {
            name: newName,
            surname: newSurname,
            class_id: Number(newClass),
          },
        },
      });
      refetch(res.data.updatePupil)
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Update Pupil Details
        </Typography>

        <TextField
          label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Surname"
          value={newSurname}
          onChange={(e) => setNewSurname(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            label="Class"
          >
            {classes?.map((c) => (
              <MenuItem value={c.id} key={c.id}>
                {c.level}
                {c.letter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
