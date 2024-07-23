import { Note } from "./note"

export default function NotesList({list}: {list: Note[]}): JSX.Element {
  return (<>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Decription</th>
        </tr>
      </thead>
      <tbody>
        {list.map(note => {
          return (
            <tr>
              <td>
                {note.title}
              </td>
              <td>
                {note.description}
              </td>
            </tr>
          )
        })}
      </tbody>
        
    </table>
  </>)
}