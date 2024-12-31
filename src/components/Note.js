import { useState } from 'react';
import { Paper, Typography, IconButton, Dialog, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note({ note, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleEdit = () => {
    onEdit(editedNote);
    setOpen(false);
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, m: 1, minWidth: 240 }}>
        <Typography variant="h6">{note.title}</Typography>
        <Typography>{note.content}</Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(note._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Paper sx={{ p: 2, minWidth: 300 }}>
          <TextField
            fullWidth
            label="Title"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            margin="normal"
          />
          <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </Paper>
      </Dialog>
    </>
  );
}

export default Note; 