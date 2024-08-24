import React,{useContext,useEffect} from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
    const a=useContext(NoteContext)
  return (
    <div>
      this is about .{a.name}
    </div>
  )
}

export default About
