import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  IconButton, 
  Dialog, 
  TextField, 
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note({ note, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = async () => {
    setIsLoading(true);
    setError('');
    try {
      await onEdit(editedNote);
      setOpen(false);
    } catch (error) {
      setError('Failed to update note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');
    try {
      await onDelete(note._id);
    } catch (error) {
      setError('Failed to delete note');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, m: 1, minWidth: 240, position: 'relative' }}>
        {isLoading && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
          }}>
            <CircularProgress />
          </div>
        )}
        
        <Typography variant="h6">{note.title}</Typography>
        <Typography>{note.content}</Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={() => setOpen(true)} disabled={isLoading}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} disabled={isLoading}>
            <DeleteIcon />
          </IconButton>
        </div>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Paper sx={{ p: 2, minWidth: 300 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Title"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            margin="normal"
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            margin="normal"
            disabled={isLoading}
          />
          <Button 
            onClick={handleEdit} 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button 
            onClick={() => setOpen(false)} 
            variant="text" 
            sx={{ mt: 2, ml: 1 }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Paper>
      </Dialog>
    </>
  );
}

export default Note; 