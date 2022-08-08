import React, { useEffect, useContext } from "react";
import NotesContext from "../context/notes-context";


const Note = ({note, removeNote}) => {

    // how to make useEffect act like component did unmount lifetime cycle:
    // with no dependencies, components will run useEffect whenever their parent component
    // re-renders.
    useEffect(() => {
      // Only when component unmounts. 
      return () => {
        // This gets called when component dismounts. 
      }
    }, []);

    const {dispatch} = useContext(NotesContext);
  
    return ( 
      <div >
        <h3>{note.title}</h3>
        <p>{note.body}</p>
        <button onClick={() => dispatch({type: 'REMOVE_NOTE', title: note.title})}>X</button>
      </div>
  );
  }

export {Note as default};