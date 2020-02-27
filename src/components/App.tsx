import React from 'react';

import Header from './Header';
import NoteForm from './NoteForm';
import Content from './Content';
import { INote, INotes, IFunc, IProps } from '../interfaces/declarations';
import '../components/App.css';
// TODO: 
// fetch notes data from server and send them to <Content notes={notes}/>

class App extends React.PureComponent<any, IProps> {

  constructor(props: any) {
    super(props);
    
    // TODO: make a fetch call to server and GET all notes
    // then send the notes to Content.tsx
    this.state = { notes: [], dataLoaded: false }

   this.fetchNotes = this.fetchNotes.bind(this); 
   this.handleEditNote = this.handleEditNote.bind(this);
   this.handleDeleteNote = this.handleDeleteNote.bind(this);
   this.handleAddNote = this.handleAddNote.bind(this);
  }
  
  handleEditNote(id: number, title: string, body: string) {
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
        this.setState(state => ({ notes: data, dataLoaded:true }));
      })
      .catch(err => {
        console.error(err);
      })
  }

  private checkIndex = (current: number, needed: number) => {
    return current === needed;
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
        this.setState({ notes: data }, () => { this.setState({dataLoaded: true }) });
      })
      .catch(err => {
        console.error(err);
      })

      // this.forceUpdate();
  }

  handleAddNote(ntitle: string, nbody: string) {
   // const date = (new Date()).toDateString();     
    const newNote: INote = { note_id: Date.now(), note_title: ntitle, note_body: nbody }
    let actualState = this.state.notes;
    actualState.push(newNote);
    this.setState({ notes: actualState });
    console.log("Inside handleAddNote: ", this.state.notes);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // Using Fetch to post the new note:
    const request = new Request('http://localhost:5000/notes/', { method: 'POST', headers: headers, body: JSON.stringify(newNote), mode: 'cors' });
    
    fetch(request)
      .then(response => {
        if(response.status === 200) {
          console.log("Note saved");
        }
        // return response.json();
      })
        // .then( data => {
        //   // console.log("Data from POST new note: ", data);
        //   const notes = data;
        //   console.log("Before dataLoaded: ", this.state.dataLoaded);
        //   this.setState({ notes: notes}, () => { this.setState( {dataLoaded: true } ) });
        //   console.log("After dataLoaded: ", this.state.dataLoaded);
        // })
        .catch(err => {
          if (err) {
            console.error(err);
          }
        })
  }  

  componentDidMount() {
    this.fetchNotes();
  }

  componentWillUnmount() {
    console.log("Entering componentWillUnmount...");
    this.setState({ notes: [], dataLoaded: false });
  }

  fetchNotes() {
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
        // console.log(response);
        const notes = response;
        this.setState({ notes: notes}, () => { this.setState({dataLoaded: true }) });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Header />   
        <NoteForm handleAddNote={this.handleAddNote}/>    
        { (this.state.notes.length < 1) && (<h3>No notes to show yet.</h3>) }             
        { (this.state.notes && this.state.notes.length > 0) && 
          (<Content notes={ this.state.notes } dataLoaded={this.state.dataLoaded} 
           handleDeleteNote={this.handleDeleteNote} handleEditNote={this.handleEditNote} />) }
      </div>
    );
  }
}

export default App;
