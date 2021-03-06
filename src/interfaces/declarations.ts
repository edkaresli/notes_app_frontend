
export interface INote {
    note_id: number 
    note_title: string 
    note_body: string 
  }
  
  export interface INotes {
    notes: INote[]
  }

  export interface IProps {    
    dataLoaded: boolean;
  }

  export interface IAppState {
    dataLoaded: boolean;
  }

  export interface IContentState {
    dataLoaded: boolean;
    notes: INote[];
  }
  export interface IFunc {
    handleAddNote(str1: string, str2: string ): void;
  }

  export interface INoteHandlers {
    handleDeleteNote(id: number): void;
    handleEditNote(id: number, title: string, body: string): void;
  }

  export interface IEditNote {
    title: string;
    body: string;
    open: boolean;
    closeDialog(title: string, body: string): void;    
  }