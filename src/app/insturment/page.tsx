'use client'
import { useEffect, useState } from "react"
import Insturment from "./insturment";

// 64 buttons
// clicking button plays unique sound
// holding a button sustains the sound
// right clicking - toggle hold

export default function InsturmentPage() {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  useEffect(() => {
    const audioCtx = new (window.AudioContext)
    setAudioCtx(audioCtx)
  }, [])

  const range = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div>
      Insturment
      <table>
        <tbody>
      {range.map((i) => {
        return (
        <tr key={`${i}`}>
          {range.map((j) => {
            return (
            <td key={`${i},${j}`}>
              <Insturment audioCtx={audioCtx} i={i} j={j} />
            </td>
            )
          })}
        </tr>
        )
      })}
        </tbody>
      </table>
    </div>
  )
}