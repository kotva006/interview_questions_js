import { useState } from "react"
import { Note } from "./note"

export default function NoteInput({onSubmit}: {onSubmit: (note: Note) => void}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (<>
    <div className="card p-6">
      <div>
        <h1>Note Form</h1>
      </div>
      <form>
        <div>
          <div>Name</div>
          <input type="text" value={title} onInput={e => {
            setTitle((e.target as HTMLInputElement).value)
          }} />
        </div>
        <div className="py-8">
          <div>Description</div>
          <textarea value={description} onInput={e => {
            setDescription((e.target as HTMLTextAreaElement).value)
          }} />
        </div>
        <button onClick={() => onSubmit({title, description})}>Submit</button>
      </form>
    </div>
  </>)
}