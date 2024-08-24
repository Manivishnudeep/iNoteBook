import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host='http://localhost:5000'
    const notesIntial = []
    

    const[notes,setNotes]=useState(notesIntial)

    //get all notes
    const getallNotes=async()=>{
       const response= await fetch(`${host}/api/notes/getallNotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authToken':localStorage.getItem('token')
            },
            body:JSON.stringify()
        });
        const json=await response.json()
        setNotes(json)

        
    }

    //to add a note
    const addNote=async(title,description,tag)=>{
        const response= await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authToken':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=await response.json()
        
        setNotes(notes.concat(json))
    }

    const deleteNote=async(id)=>{
        // console.log(id)
        const response= await fetch(`${host}/api/notes/deleteNode/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'authToken':localStorage.getItem('token')
            },
        });
        const json=await response.json()
        // console.log(json)
        const newnotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newnotes)
    }

    const editNote=async (id,title,description,tag)=>{
        //Api Call
        const response= await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'authToken':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=response.json()
        // console.log(json)
        const newNotes=JSON.parse(JSON.stringify(notes))
        for(let i=0;i<newNotes.length;i++){
            const element=newNotes[i]
            if(element._id===id){
                newNotes[i].title=title
                newNotes[i].description=description
                newNotes[i].tag=tag
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getallNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
