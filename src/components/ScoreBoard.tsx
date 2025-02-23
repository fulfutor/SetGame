import { formatTime } from "../utils/utils";

interface ScoreBoardProps {
    timeElapsed: number;
}

export function ScoreBoard({ timeElapsed }: ScoreBoardProps) {
    return (
        <div className="p-6 mb-8">
            <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Time</h3>
                    <p className="font-mono text-4xl">{formatTime(timeElapsed)}</p>
                </div>
            </div>
        </div>
    );
}
