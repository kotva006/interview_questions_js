'use client'
import { useEffect } from 'react'
import styles from './styles.module.css'
import {Game} from './game'

export default function GameOfLife() {

  useEffect(() => {
    Game.init();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.display}>
        <div className={styles.statusTitle}>
          <h2>Conway's Game of Life</h2>
        </div>
        <div className={`${styles.challengeSummary}`}>
          The simulation proceeds in a series of "generations". At each iteration, a simple set of rules are applied to determine if a cell lives or dies. The rules are below:
          <ul className='list-disc list-outside px-8'>
            <li>
             <span>Any live cell with two or three neighbors survives.</span>
            </li>
            <li>
              Any dead cell with three live neighbors becomes a live cell.
            </li>
            <li>
              All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            </li>
            <li>
              A "neighbor" is any of the 8 cells adjacent or diagonal to the cell in question.
            </li>
          </ul>
        </div>
        <a id="exampleLink" href="https://playgameoflife.com/" target="_blank">
          Example
        </a>
      </div>
      <canvas className={styles.canvas}></canvas>
    </main>
  )
}