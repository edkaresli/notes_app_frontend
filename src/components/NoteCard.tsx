import React, { FunctionComponent, useState } from 'react';
import { INote, INoteHandlers } from '../interfaces/declarations';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditCard from './EditCard';

const useStyles = makeStyles({
    root: {
      minWidth: "300px",
      marginLeft: '20vh',
      marginRight: '20vh',
      marginTop: '20px',
      borderTop: '1px solid #eeeeee',
      visibility: 'visible' 
    },
    noteDate: {
      fontSize: 14,
      color: '#0066ff' 
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
        marginRight: 2,
        alignItems: "right"
    }
  });

const NoteCard = (props: INote & INoteHandlers) => {
     
  const [noteID, setNoteID] = useState<number>(props.note_id);
  const [note_title, setNoteTitle] = useState<string>(props.note_title);
  const [note_body, setNoteBody] = useState<string>(props.note_body);
  const [open, setOpen] = useState<boolean>(false);
  
  const datetime = (dt: number) => {
    let date: Date = new Date(dt);
    let result: string = date.toLocaleDateString() + ':' + date.toLocaleTimeString();
    return result;
  }

  const delNote = () => {
    const current_id = noteID;
    props.handleDeleteNote(current_id);       
    setNoteTitle('');
    setNoteBody('');    
  }
  
  const edNote = () => {
    setOpen(true);
  }

  const closeDialog = (title: string, body: string) => {
    if(title === '' || body === '') {
      setOpen(false);
      return;
    }

    setNoteTitle(title);
    setNoteBody(body);
    setOpen(false);
    console.log("Inside NoteCard closeDialog: ", noteID, title, body);
    props.handleEditNote(noteID, title, body);        
  }

  const classes = useStyles();  

  return (                 
    <>
    <Card key={noteID} className={classes.root} >        
        <CardContent>
          <Typography className={classes.noteDate}>
            {datetime(noteID)}
          </Typography>  
          <Typography className={classes.title} color="textPrimary" gutterBottom>
          { note_title }
          </Typography>
          <Typography variant="h5" component="h2">            
          { note_body }
          </Typography>               
        </CardContent>
        <CardActions>
            <Button id="edNote" size="small" variant="contained" color="primary" onClick={edNote}>Edit</Button>
            <Button id="delNote" size="small" variant="contained" color="secondary" onClick={delNote}>X</Button>
        </CardActions>
    </Card>           
    <EditCard title={note_title} body={note_body} open={open} closeDialog={closeDialog} />
    </>
  );
}  

export default NoteCard;
    