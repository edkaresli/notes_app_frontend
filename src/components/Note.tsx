import React from 'react';

import NoteCard from './NoteCard';

import { INote, INoteHandlers } from '../interfaces/declarations';

class Note extends React.PureComponent<INote & INoteHandlers, INote> {
    constructor(props: INote & INoteHandlers ) {
        super(props);
        
        this.state = {
          note_id: props.note_id,
          note_title: props.note_title,
          note_body: props.note_body
        }        
    }        

    render() {    
      const note: INote = this.props;
      return (
        <NoteCard note_id={note.note_id} note_title={note.note_title} note_body={note.note_body} 
            handleDeleteNote={this.props.handleDeleteNote} handleEditNote={this.props.handleEditNote}/>
      );
    }
}

export default Note;