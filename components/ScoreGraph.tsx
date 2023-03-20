import { Player } from "../types/global";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAllRounds, getColors } from "../funcs/global";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface ScoreGraphProps {
    players: Player[];
}

function getCumulativeArray(arr: number[]): number[] {
    const cumulativeArr = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        cumulativeArr.push(cumulativeArr[i - 1] + arr[i]);
    }

    return cumulativeArr;
}

export const ScoreGraph = ({ players }: ScoreGraphProps) => {
    const labels = getAllRounds();
    const colors = getColors();
    const datasets = players.map((player, index) => {
        return {
            label: player.name,
            data: getCumulativeArray(
                labels.map((label, index) => {
                    const roundScore = player.score[label];
                    if (typeof roundScore === "number") {
                        return roundScore;
                    }
                    return 0;
                })
            ),
            fill: false,
            borderColor: colors[index % colors.length],
            tension: 0.1,
        };
    });
    const data = {
        labels,
        datasets,
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Nines Score Graph",
            },
        },
    };
    console.log({ data, options });

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};
