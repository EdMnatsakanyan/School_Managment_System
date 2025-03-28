import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PUPILS } from "./queries";
import { useEffect, useState } from "react";
import { IClass, IPupil } from "../../types";
import { GET_CLASSES } from "../classes/queries";
import { useNavigate } from "react-router-dom";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import AddPupilModal from "./addPupilModal";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.03)",
  },
  marginBottom: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiSelect-root": {
    padding: theme.spacing(1.5),
  },
}));

export default function Pupils() {
  const { loading: pupilsLoading, data, refetch } = useQuery(GET_PUPILS);  // Используем refetch
  const [getClasses, { loading: classesLoading }] = useLazyQuery(GET_CLASSES);
  const [pupils, setPupils] = useState<IPupil[] | null>(null);
  const [classes, setClasses] = useState<IClass[] | null>(null);
  const [filteredPupils, setFilteredPupils] = useState<IPupil[] | null>(null);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getClasses()
      .then((data) => setClasses(data.data.classes))
      .catch((err) => console.log(err));

    if (data) {
      setPupils(data.pupils);
      setFilteredPupils(data.pupils);
    }
  }, [data]);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    if (!e.target.value) {
        setFilteredPupils(pupils)
        return
    }
    setFilteredPupils(
      (pupils?.filter((p) => p.class.id == e.target.value)!) || []
    );
  };

  if (pupilsLoading || classesLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!filteredPupils) return <>Loading...</>;

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pupils List
        </Typography>

      <Button 
        sx={{width: '200px'}}
        variant="outlined"
        fullWidth
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Add Pupil
      </Button>

        <Typography variant="body1" color="text.secondary">
          Filter pupils by class
        </Typography>
      </Box>

      <Box sx={{ mb: 4, maxWidth: 400, margin: "0 auto" }}>
        <FormControl fullWidth>
          <InputLabel id="class-select-label">Class</InputLabel>
          <StyledSelect
            labelId="class-select-label"
            label="Class"
            onChange={handleChange!}
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            {classes?.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.level}
                {c.letter}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>

      <Box width={'35%'} display={'flexbox'} alignItems={'center'} paddingLeft={'32.5%'}>
        {filteredPupils.map((pupil) => (
          <StyledCard key={pupil.id} >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {pupil.name} {pupil.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class: {pupil.class.level}
                {pupil.class.letter}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                onClick={() => navigate("/pupils/" + pupil.id)}
              >
                View Details
              </Button>
            </CardContent>
          </StyledCard>
        ))}
        <AddPupilModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}
      />
      </Box>
    </>
  );
}
