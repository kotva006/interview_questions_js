'use client';

import { useState } from "react";
import NotesList from "./notes-list";
import { Note } from "./note";
import NoteInput from "./note-input";

export default function NotesAppPage() {
  const [notesList, setNotesList] = useState<Note[]>([])

  const onSubmit = (note: Note): void => {
    setNotesList([...notesList, note])
  }

  return (
    <div className="layout-column align-items-center justify-content-start">
    <section className="layout-row align-items-center justify-content-center mt-30">
      <NoteInput onSubmit={onSubmit} />
    </section>

    <div className="mt-50">

    </div>
    <div className="card w-40 pt-30 pb-8">
      <NotesList list={notesList} />
    </div>
  </div>
  )
}