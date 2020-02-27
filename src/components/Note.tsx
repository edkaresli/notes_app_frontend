import React from 'react';

import NoteCard from './NoteCard';

import { INote, INoteHandlers } from '../interfaces/declarations';

class Note extends React.Component<INote & INoteHandlers, INote> {
    constructor(props: INote & INoteHandlers ) {
        super(props);
        
        this.state = {
          note_id: props.note_id,
          note_title: props.note_title,
          note_body: props.note_body
        } 
       // this.handleClick = this.handleClick.bind(this);
    }
    
    // private handleClick(event: any) {
    //   const el = event.target;
    //   switch(el.id) {
    //       case "edNote": console.log("Edit Note: ", el);
    //       break;
    //       case "delNote": console.log("Delete Note: ", el);
    //       break;
    //   }
    // }

    render() {    
      const note: INote = this.props;
      return (
        <NoteCard note_id={note.note_id} note_title={note.note_title} note_body={note.note_body} 
            handleDeleteNote={this.props.handleDeleteNote} handleEditNote={this.props.handleEditNote}/>
      );
    }
}

export default Note;