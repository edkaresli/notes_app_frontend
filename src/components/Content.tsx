import React from 'react';

import { INote, IProps, IContentState } from '../interfaces/declarations';

import Note from './Note';
import NoteForm from './NoteForm';

import './Content.css';

export default class Content extends React.PureComponent<any, IContentState> {
  constructor(props: IProps) {
    super(props);

    this.state = { dataLoaded: false, notes: [] };
     
    this.fetchNotes = this.fetchNotes.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
  }
  
  handleAddNote(ntitle: string, nbody: string) {        
     const newNote: INote = { note_id: Date.now(), note_title: ntitle, note_body: nbody }     
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     // Using Fetch to post the new note:
     const request = new Request('http://localhost:5000/notes/', { method: 'POST', headers: headers, body: JSON.stringify(newNote), mode: 'cors' });
     
     fetch(request)
       .then(response => {
         if(response.status === 200) {
           console.log("Note saved");          
           console.log("dataLoaded: ", this.state.dataLoaded);                             
           return response.json();
         }
       })
       .then(data => {
         this.setState({ dataLoaded: !this.state.dataLoaded, notes: data});
       })         
       .catch(err => {
         if (err) {
           console.error(err);
         }
       })
   }  

  private handleEditNote(id: number, title: string, body: string) {
    if( isNaN(id) || id === undefined )
      return;
    const theNote: INote = { note_id: id, note_title: title, note_body: body }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/notes/' + id, { method: 'PUT', headers: headers, body: JSON.stringify(theNote), mode: 'cors'} );
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(state => ({ notes: data, dataLoaded:!this.state.dataLoaded }));       
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleDeleteNote(id: number) {
    if(isNaN(id) || id === undefined )
      return;
    
    let actualState = this.state.notes;
    
    const index = actualState.findIndex((currentValue) =>{
      return currentValue.note_id === id;
    }, id);   

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    const request = new Request('http://localhost:5000/notes/' + id, { method: 'DELETE', headers: headers, body: '', mode: 'cors'} );  
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ notes: data }, () => { this.setState({ dataLoaded: !this.state.dataLoaded }) });        
      })
      .catch(err => {
        console.error(err);
      })     
  }

  private fetchNotes() {
    const url = 'http://localhost:5000/notes/';
    fetch(url)
      .then(response => {
        if(response.status === 200) {
          return response.json(); 
        }
        else {
          throw new Error(`Status: ${response.status}. Something is wrong with server!`)
        }        
      })
      .then(response => {        
        const notes = response;
        this.setState({ notes: notes}, () => { this.setState({dataLoaded: !this.state.dataLoaded }) });
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.fetchNotes();
    this.forceUpdate();
  }

  private createNote = (noteData: INote) => {
    return (
      <Note key={noteData.note_id} 
            note_id={noteData.note_id} 
            note_title={noteData.note_title} 
            note_body={noteData.note_body}
            handleDeleteNote={this.handleDeleteNote} 
            handleEditNote={this.handleEditNote} 
            />
    )
  } 

  public render() { 
    
    return(
      <>
        <NoteForm handleAddNote={this.handleAddNote}/>
        { ((!this.state.notes) || (this.state.notes.length <= 0)) && (<h3>No notes to show!</h3>)  }
        
        {
          (this.state.notes.map(note => this.createNote(note)))
        }
      </>
    );
  }
}
