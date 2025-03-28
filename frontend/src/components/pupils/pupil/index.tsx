import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_PUPIL, GET_PUPIL_F } from "../queries";
import { useEffect, useState } from "react";
import { IPupil } from "../../../types";
import UpdatePupilModal from "./updatePupilModal";
import { Button, Card, Typography, Stack, Box } from "@mui/material";

export default function Pupil() {
  const { id } = useParams();
  const [pupil, setPupil] = useState<IPupil | null>(null);
  const [getPupil] = useLazyQuery(GET_PUPIL_F(Number(id)));
  const [deletePupil] = useMutation(DELETE_PUPIL);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getPupil()
      .then((res) => setPupil(res.data.pupil))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
    deletePupil({
      variables: { id: pupil?.id },
    })
      .then(() => {
        navigate("/pupils");
      })
      .catch((err) => console.log(err));
  };

  if (!pupil) return <>Loading ...</>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Card sx={{ padding: 3, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {pupil.name} {pupil.surname}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          Class {pupil.class.level}
          {pupil.class.letter}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}>
            Update
          </Button>
        </Stack>
      </Card>

      <UpdatePupilModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={(p: IPupil) => setPupil(p)} pupil={pupil} />
    </Box>
  );
}
