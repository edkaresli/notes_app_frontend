import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, TextField } from '@material-ui/core';

import { INote, IFunc } from '../interfaces/declarations';

import './NoteForm.css';


// import { isUserWhitespacable } from '@babel/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1) //,
        //width: 200,
      },
      display: "flex",
      flexDirection: "column",
      marginLeft: "30%",
      marginRight: "30%"
    },
  }),
);

const NoteForm: React.FC<IFunc> = (props) => {
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
  }
  
  const [note_title, setNoteTitle] = React.useState('');
  const [note_body, setNoteBody] = React.useState('');

  const handleChangeNoteTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };
  
  const handleChangeNoteBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteBody(event.target.value);
  };

  const classes = useStyles();

  const addNote = () => {
    // console.log("Note title: ", note_title);
    // console.log("Note body: ", note_body);
    if(note_title === '' || note_body === '') 
      return;
    props.handleAddNote(note_title, note_body);
    setNoteTitle("");
    setNoteBody("");
  }

  // const handleAddNote = (event: any) => {
  //   const date = (new Date()).toDateString();     
  //   const newNote: INote = { note_id: Date.now(), note_title, note_body }
  //   // Using Fetch to post the new note:
  //   const request = new Request('https://localhost:5000/notes/', { method: 'POST', body: JSON.stringify(newNote) });
  // } 
  // TODO: Do I need a <form></form> tag? maybe just a <Box></Box> is enough?!
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>     
      <Box> 
        <TextField id="filled-basic" label="Note Title" variant="filled" fullWidth value={note_title} onChange={handleChangeNoteTitle}/>
        <TextField id="filled-multiline-static" label="Note Body" multiline rows="4" 
          fullWidth variant="filled" value={note_body} onChange={handleChangeNoteBody} /> 
        <Button variant="contained" color="primary" onClick={addNote}>Add Note</Button>
      </Box>
    </form>
  );
}

export default NoteForm;