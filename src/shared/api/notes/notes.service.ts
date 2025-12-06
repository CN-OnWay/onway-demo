import {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  NotesResponse,
} from './types';
import { mockNotes } from '../mocks/notes.mock';

// Mock данные вместо реальных API запросов
const notes = [...mockNotes];

export const notesAPI = {
  // GET /notes
  getNotes: async (): Promise<NotesResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          notes: notes,
          total: notes.length,
          page: 1,
          limit: 10,
        });
      }, 300);
    });
  },

  // POST /notes
  createNote: async (data: CreateNoteRequest): Promise<Note> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newNote: Note = {
          id: 'note-' + Date.now(),
          carID: data.carID,
          date: new Date().toISOString(),
          desc: data.desc,
          staffID: data.staffID,
          tag: data.tag,
          term: data.term,
          title: data.title,
        };
        notes.push(newNote);
        resolve(newNote);
      }, 300);
    });
  },

  // PUT /notes/:id
  updateNote: async (id: string, data: UpdateNoteRequest): Promise<Note> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = notes.findIndex(n => n.id === id);
        if (index !== -1) {
          notes[index] = { ...notes[index], ...data };
          resolve(notes[index]);
        } else {
          reject(new Error('Note not found'));
        }
      }, 300);
    });
  },

  // DELETE /notes/:id
  deleteNote: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = notes.findIndex(n => n.id === id);
        if (index !== -1) {
          notes.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Note not found'));
        }
      }, 200);
    });
  },
};
