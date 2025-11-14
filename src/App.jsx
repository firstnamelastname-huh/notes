import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5000/api/notes';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
      }

      setTitle('');
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <div className="app">
      <h1>Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'} Note</button>
          {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
