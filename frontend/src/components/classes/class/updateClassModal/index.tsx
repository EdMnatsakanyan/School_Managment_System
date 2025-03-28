import { Modal, Box, Typography, Button, TextField, MenuItem, CircularProgress } from "@mui/material";
import { IClass } from "../../../../types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CLASS } from "../../queries";

interface IProps {
    updateModal: boolean;
    setUpdateModal: (b: boolean) => void;
    Class: IClass;
    refetch: () => void;
}

export default function UpdateClass({ updateModal, setUpdateModal, Class, refetch }: IProps) {
    const [newLevel, setNewLevel] = useState<number>(Class.level);
    const [newLetter, setNewLetter] = useState<string>(Class.letter);
    const [updateClass, { loading, error }] = useMutation(UPDATE_CLASS);

    const handleUpdate = async () => {
        try {
            await updateClass({
                variables: {
                    id: Class.id,
                    input: { level: newLevel, letter: newLetter }
                }
            });
            refetch();
            setUpdateModal(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal open={updateModal} onClose={() => setUpdateModal(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Update Class {Class.level}{Class.letter}
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error.message}
                    </Typography>
                )}

                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        select
                        label="Level"
                        value={newLevel}
                        onChange={(e) => setNewLevel(Number(e.target.value))}
                        fullWidth
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => (
                            <MenuItem key={l} value={l}>
                                {l}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Letter"
                        value={newLetter}
                        inputProps={{ maxLength: 1 }}
                        onChange={(e) => setNewLetter(e.target.value.toUpperCase())}
                        fullWidth
                    />

                    <Box display="flex" justifyContent="space-between">
                        <Button onClick={() => setUpdateModal(false)} color="error" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} color="primary" variant="contained" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Update"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
