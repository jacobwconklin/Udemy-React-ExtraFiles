import React, {useContext} from "react";
import Note from "./Note";
import NotesContext from "../context/notes-context";

const NoteList = () => {
    // Access data from context with useContext hook
    const {notes} = useContext(NotesContext); // Provide the context you want and get the value back
    
    return notes.map((note) => (
        <Note key={note.title} note={note} />
      )) 
}

export default NoteList;