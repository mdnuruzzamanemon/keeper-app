import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import CreateNote from './CreateNote';
import Note from './Note';

function Home() {
  const [notes, setNotes] = useState([]);

  // Temporary mock data
  useEffect(() => {
    setNotes([
      { _id: '1', title: 'Test Note', content: 'This is a test note' }
    ]);
  }, []);

  const handleAddNote = (newNote) => {
    // TODO: Implement API call
    setNotes([...notes, { ...newNote, _id: Date.now().toString() }]);
  };

  const handleDeleteNote = (id) => {
    // TODO: Implement API call
    setNotes(notes.filter(note => note._id !== id));
  };

  const handleEditNote = (updatedNote) => {
    // TODO: Implement API call
    setNotes(notes.map(note => 
      note._id === updatedNote._id ? updatedNote : note
    ));
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
    </Container>
  );
}

export default Home;