import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_TEACHER } from "../queries";

export default function AddTeacher() {
  const { register, handleSubmit, formState: { errors } } = useForm<AddTeacherData>();
  const navigate = useNavigate();
  const [addTeacher] = useMutation(ADD_TEACHER);

  interface AddTeacherData {
    name: string;
    surname: string;
  }

  const handleAdd = async (data: AddTeacherData) => {
    await addTeacher({
        variables: data
    })
    navigate('/teachers')
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Add Teacher
      </Typography>

      <form onSubmit={handleSubmit(handleAdd)}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          {...register('name', {
            required: 'Please fill name',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters long',
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message ? String(errors.name?.message) : ""}
        />

        <TextField
          fullWidth
          label="Surname"
          variant="outlined"
          margin="normal"
          {...register('surname', {
            required: 'Please fill surname',
            minLength: {
              value: 3,
              message: 'Surname must be at least 3 characters long',
            },
          })}
          error={!!errors.surname}
          helperText={errors.surname?.message ? String(errors.surname?.message) : ""}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Add Teacher
        </Button>
      </form>
    </Box>
  );
}
