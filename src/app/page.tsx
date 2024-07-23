import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          <div className="py-8">These are the interview questions</div>
          <ul className="list-disc list-inside">
            <li>
              <a className="underline" href="game-of-life">Game of Life</a>
            </li>
            <li>
              <a className="underline" href="insturment">Insturment Board</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
