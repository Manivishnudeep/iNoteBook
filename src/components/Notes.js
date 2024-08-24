import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const Navigate=useNavigate();
    const context = useContext(NoteContext)
    const { notes, getallNotes, editNote } = context;
    const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        if(localStorage.getItem('token')){
            getallNotes();
        }
        else{
            Navigate("/login")
        }
        // eslint-disable-next-line
    }, []);
    const updateNote = (currentNode) => {
        setNote({ eid: currentNode._id, etitle: currentNode.title, edescription: currentNode.description, etag: currentNode.tag })
        ref.current.click();
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const handleClick = (e) => {
        // console.log("updating",note)
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        refClose.current.click();

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <>

            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" value={note.etitle} onChange={onChange} required minLength={3} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" name='edescription' value={note.edescription} onChange={onChange} required minLength={5} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" name='etag' value={note.etag} onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className='container mx-2'>
                    {notes.length===0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
