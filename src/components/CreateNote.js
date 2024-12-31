import { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';

function CreateNote({ onAdd }) {
  const [note, setNote] = useState({ title: '', content: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title || note.content) {
      onAdd(note);
      setNote({ title: '', content: '' });
      setIsExpanded(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <TextField
            fullWidth
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            margin="normal"
          />
        )}
        <TextField
          fullWidth
          placeholder="Take a note..."
          multiline
          rows={isExpanded ? 3 : 1}
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          onClick={() => setIsExpanded(true)}
          margin="normal"
        />
        {isExpanded && (
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 1 }}
          >
            Add Note
          </Button>
        )}
      </form>
    </Paper>
  );
}

export default CreateNote; 