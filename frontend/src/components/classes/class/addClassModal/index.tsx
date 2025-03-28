import { useMutation } from "@apollo/client";
import { Modal, Box, Typography, TextField, Select, MenuItem, Button, Stack } from "@mui/material";
import { useState } from "react";
import { ADD_CLASS } from "../../queries";

interface IProps {
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    refetch: () => void;
}

export default function AddClassModal({ isOpen, setIsOpen, refetch }: IProps) {
    const [newLevel, setNewLevel] = useState<number>(1);
    const [newLetter, setNewLetter] = useState<string>("A");
    const [newRoom, setNewRoom] = useState<string>("");
    const [addClass, { loading, error }] = useMutation(ADD_CLASS);

    const handleAdd = async () => {
        if (newLetter.length < 1 || newRoom.length < 1) return;
        try {
            await addClass({
                variables: {
                    input: {
                        level: newLevel,
                        letter: newLetter,
                        room_number: Number(newRoom),
                    },
                },
            });
            refetch();
            setIsOpen(false);
        } catch (err) {
            console.error(err);
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
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 400,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Add New Class
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" mb={2}>
                        {error.message}
                    </Typography>
                )}

                <Stack spacing={2}>
                    <Select value={newLevel} onChange={(e) => setNewLevel(Number(e.target.value))} fullWidth>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => (
                            <MenuItem key={l} value={l}>
                                {l}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Letter"
                        value={newLetter}
                        onChange={(e) => setNewLetter(e.target.value.toUpperCase())}
                        inputProps={{ maxLength: 1 }}
                        fullWidth
                    />

                    <TextField
                        label="Room Number"
                        type="number"
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                        fullWidth
                    />

                    <Button variant="contained" color="primary" onClick={handleAdd} disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
