import React from 'react';
import { createStyles, withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { Box, Button, TextField, StyledComponentProps, createMuiTheme } from '@material-ui/core';

import { INote, IFunc } from '../interfaces/declarations';

import './NoteForm.css';


const styles = (theme?: Theme): StyleRules<any> => { 
    return {
      root: {
      '& .MuiTextField-root': {
        margin: theme? theme.spacing(1) : 1 
      },
      display: "flex",
      flexDirection: "column",
      marginLeft: "30%",
      marginRight: "30%"
    },
  }
}
 
interface IState {
  note_title: string;
  note_body: string;
}

class NoteForm extends React.PureComponent<IFunc & StyledComponentProps, IState> {
  constructor(props: IFunc & StyledComponentProps) {
    super(props);

    this.state = {
      note_title: '',
      note_body: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNoteTitle = this.handleChangeNoteTitle.bind(this);
    this.handleChangeNoteBody = this.handleChangeNoteBody.bind(this);
    this.addNote = this.addNote.bind(this);
  }
  
  private handleSubmit(event: any) {
    event.preventDefault();
  }

  private handleChangeNoteTitle(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ note_title: event.target.value })
  }

  private handleChangeNoteBody(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ note_body: event.target.value })
  }

  private addNote() {
    
    if(this.state.note_title === '' || this.state.note_body === '') 
      return;
    this.props.handleAddNote(this.state.note_title, this.state.note_body);
    this.setState({ note_title: '', note_body: '' });
  }
  
  render() {
   
    const note_title = this.state.note_title;
    const note_body  = this.state.note_body;
    const titleStyle = { marginTop: '10px', marginBottom: '5px' }

    return (    
      <form style={ {marginLeft: '30%', marginRight: '30%'} } noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Box> 
          <TextField id="filled-basic" label="Note Title" style={titleStyle} variant="filled" fullWidth value={note_title} onChange={this.handleChangeNoteTitle}/>
          <TextField id="filled-multiline-static" label="Note Body" multiline rows="4" 
            fullWidth variant="filled" value={note_body} onChange={this.handleChangeNoteBody} /> 
          <Button style={ {marginTop:'10px'}} variant="contained" color="primary" onClick={this.addNote}>Add Note</Button>
        </Box>    
      </form>                
    );
  }
  
}

const StyledComponent = withStyles(styles)(NoteForm);
export default StyledComponent; // NoteForm;