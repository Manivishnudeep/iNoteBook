import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={onChange} value={note.title} required minLength={3} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" name='description' onChange={onChange} value={note.description} required minLength={5} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" name='tag'value={note.tag} onChange={onChange} />
                </div>

                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
