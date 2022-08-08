import React, { useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';
import AddForm from './AddForm';
import NotesContext from '../context/notes-context';

const NoteApp = () => {

    // localStorage.setItem('items', JSON.stringify([{title: 'first', body: 'note' }]));
    // const notesData = JSON.parse(localStorage.getItem('buns'));
    // use Reducer is a hook letting us simply and easily do Redux stuff. It does need
    // a Reducer function to already exist here it is notesReducer
    // useReducer returns an array with your state and a dispatch function.
    const [notes, dispatch] = useReducer(notesReducer, []);
    // const [notes, setNotes] = useState(notesData || []);
  
    useEffect(() => {
      const notes = JSON.parse(localStorage.getItem('items'))
      console.log(notes);
      if (notes.length) {
        dispatch({type: 'POPULATE_NOTES', notes})
      }
    }, []);
  
    useEffect(() => {
      // write notes into local storage
      if (notes) localStorage.setItem('items', JSON.stringify(notes));
      console.log(notes);
    }, [notes]);
  
    /* useEffect(()=> {
      // only runs on component first mounting
      // From a real database this would require an asynchronous call to a database
      console.log('in here');
      const notesData = JSON.parse(localStorage.getItem('buns'));
      if (notesData) {
        setNotes(notesData);
      }
    }, []); */
  
    // Value properties tied to Context.Prover are available to all components that are children
    // of the provider or thier children's children.
    // Here NoteList and AddForm and any of their children can extract notes or dispatch from NotesContext. 
    return (
      <NotesContext.Provider value={{notes, dispatch}}>
        <h1>Title Text</h1>
        <p>Notes:</p>
        <NoteList/>
        <p>word</p>
        <AddForm />
      </NotesContext.Provider>
    )
  }

  export { NoteApp as default };