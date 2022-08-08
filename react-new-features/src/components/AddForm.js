import React, {useState, useContext} from "react";
import NotesContext from "../context/notes-context";

const AddForm = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const {dispatch} = useContext(NotesContext);
    const addNote = (e) => {
        e.preventDefault();
        // setNotes([
        //  ...notes,
        //  { title, body }
        // ]);
        dispatch({type: 'ADD_NOTE', title, body})
        setTitle('');
        setBody('');
    }

    return (
        <div>
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <input value={body} onChange ={(e) => setBody(e.target.value)} />
                <button>Add Note</button>
            </form>
        </div>
    )
}

export default AddForm;