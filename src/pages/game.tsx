import { GameBoard } from "../components/GameBoard";

export default function Game() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container px-4 py-6 mx-auto">
                    <h1 className="text-4xl font-bold text-center">Set!</h1>
                </div>
            </header>
            <main>
                <GameBoard />
            </main>
        </div>
    );
}
