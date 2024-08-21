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

import { getAllRounds, getColors } from "@/funcs/global";
import { Player } from "@/types/global";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getCumulativeArray({ arr }: { arr: number[] }): number[] {
    const cumulativeArr = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        cumulativeArr.push(cumulativeArr[i - 1] + arr[i]);
    }

    return cumulativeArr;
}

export const ScoreGraph = ({ players }: { players: Player[] }) => {
    const labels = getAllRounds();
    const colors = getColors();
    const datasets = players.map((player, index) => {
        return {
            label: player.name,
            data: getCumulativeArray({
                arr: labels.map((label) => {
                    const roundScore = player.score[label];
                    if (typeof roundScore === "number") {
                        return roundScore;
                    }
                    return 0;
                }),
            }),
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

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};
