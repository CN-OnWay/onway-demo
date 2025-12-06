import { Note, NotesResponse } from '../notes/types';

export const mockNotes: Note[] = [
  {
    id: 'note-1',
    carID: '1',
    date: new Date().toISOString(),
    desc: 'Regular maintenance completed',
    staffID: 'staff-1',
    tag: 'maintenance',
    term: 'completed',
    title: 'Oil Change',
  },
  {
    id: 'note-2',
    carID: '2',
    date: new Date(Date.now() - 86400000).toISOString(),
    desc: 'Tire pressure checked and adjusted',
    staffID: 'staff-2',
    tag: 'inspection',
    term: 'completed',
    title: 'Tire Check',
  },
  {
    id: 'note-3',
    carID: '1',
    date: new Date(Date.now() + 604800000).toISOString(),
    desc: 'Scheduled brake inspection',
    staffID: 'staff-1',
    tag: 'maintenance',
    term: 'scheduled',
    title: 'Brake Inspection',
  },
];

export const mockNotesResponse: NotesResponse = {
  notes: mockNotes,
  total: mockNotes.length,
  page: 1,
  limit: 10,
};
