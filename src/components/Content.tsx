import React from 'react';

import { INote, INoteHandlers, IProps } from '../interfaces/declarations';

import Note from './Note';

import './Content.css';

export default class Content extends React.PureComponent<IProps & INoteHandlers, IProps> {
  constructor(props: IProps & INoteHandlers) {
      super(props);

      this.state = { notes: this.props.notes, dataLoaded: this.props.dataLoaded };
     // console.log("State inside Content: ", this.state.notes);
  }
  
  private createNote = (noteData: INote) => {
    return (
      <Note key={noteData.note_id} 
            note_id={noteData.note_id} 
            note_title={noteData.note_title} 
            note_body={noteData.note_body}
            handleDeleteNote={this.props.handleDeleteNote} 
            handleEditNote={this.props.handleEditNote} 
            />
    )
  } 

  public render() { 
    
    return(
      <>
        { ((!this.state.notes) || (this.state.notes.length <= 0)) && (<h3>No notes to show!</h3>)  }
        
        {
          (this.state.notes.map(note => this.createNote(note)))
        }
      </>
    );
  }
}
