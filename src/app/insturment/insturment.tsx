import { useEffect, useState } from "react";

export default function Insturment(props : any) {

  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (props.audioCtx) {
      const localOscillator = props.audioCtx.createOscillator();
      localOscillator.type = "square";
      localOscillator.frequency.setValueAtTime(440 + ((props.i * 20) + (props.j * 10)), props.audioCtx.currentTime); // value in hertz
      localOscillator.start();
      setOscillator(localOscillator)
    }
  }, [props.audioCtx])

  const playSound = (e: any, i: number, j: number) => {
    if (e.button === 0 && props.audioCtx && oscillator) {
      props.audioCtx.resume()
      oscillator.connect(props.audioCtx.destination);
    }
  }

  const onContextMenuClick = (e: any) => {
    e.stopPropagation();
    if (isPlaying && oscillator) {
      oscillator.disconnect();
      setIsPlaying(!isPlaying)
    } else {
      playSound({button: 0}, 0, 0)
      setIsPlaying(true)
    }
  }

  // button 0 left click
  // button 2 right click
  const stopSound = (e: any) => {
    if (e.button === 0 && oscillator) {
      oscillator.disconnect();
    }
  }

  return (
    <button className="btn btn-blue" onMouseDown={(e: any) => playSound(e, props.i * 20, props.j * 10)} onMouseUp={(e: any) => stopSound(e)} onContextMenu={onContextMenuClick}>{`${props.i}, ${props.j}`}</button>
  )

}