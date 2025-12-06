export interface Note {
  id: string;
  carID: string;
  date: string;
  desc: string;
  staffID: string;
  tag: string;
  term: string;
  title: string;
}

export interface CreateNoteRequest {
  carID: string;
  desc: string;
  staffID: string;
  tag: string;
  term: string;
  title: string;
}

export interface UpdateNoteRequest {
  carID?: string;
  desc?: string;
  staffID?: string;
  tag?: string;
  term?: string;
  title?: string;
}

export interface NotesResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
}
