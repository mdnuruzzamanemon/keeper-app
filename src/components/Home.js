import { useState, useEffect } from 'react';
import { Container, Grid, Alert, Snackbar } from '@mui/material';
import CreateNote from './CreateNote';
import Note from './Note';
import api from '../services/api';

function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch notes from API
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      const response = await api.post('/notes', newNote);
      setNotes([response.data, ...notes]);
      setSuccessMessage('Note added successfully');
    } catch (error) {
      setError('Failed to add note');
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      setSuccessMessage('Note deleted successfully');
    } catch (error) {
      setError('Failed to delete note');
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      const response = await api.put(`/notes/${updatedNote._id}`, updatedNote);
      setNotes(notes.map(note => 
        note._id === updatedNote._id ? response.data : note
      ));
      setSuccessMessage('Note updated successfully');
    } catch (error) {
      setError('Failed to update note');
      console.error('Error updating note:', error);
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
  };

  return (
    <Container>
      <CreateNote onAdd={handleAddNote} />
      <Grid container spacing={2}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <Note 
              note={note} 
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
            />
          </Grid>
        ))}
      </Grid>

      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={3000} 
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;