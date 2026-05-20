import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { getAllRounds, getColors } from "@/funcs/global";
import { Player } from "@/types/global";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function getCumulativeArray({ arr }: { arr: number[] }): number[] {
  const cumulativeArr = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    cumulativeArr.push(cumulativeArr[i - 1] + arr[i]);
  }

  return cumulativeArr;
}

// Utility to resolve theme CSS variables to solid RGB/RGBA colors in browser
const resolveCSSColor = (cssColorString: string, fallback: string): string => {
  if (typeof window === "undefined") return fallback;
  try {
    const tempDiv = document.createElement("div");
    tempDiv.style.color = cssColorString;
    document.body.appendChild(tempDiv);
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    return computedColor || fallback;
  } catch (e) {
    return fallback;
  }
};

const rgbColorPattern =
  /^rgba?\(\s*([+-]?(?:\d+|\d*\.\d+)(?:%?)?)\s*,\s*([+-]?(?:\d+|\d*\.\d+)(?:%?)?)\s*,\s*([+-]?(?:\d+|\d*\.\d+)(?:%?)?)(?:\s*,\s*(?:[+-]?(?:\d+|\d*\.\d+)(?:%?)?))?\s*\)$/i;

const toRgba = (color: string, alpha: number, fallback: string): string => {
  const match = color.match(rgbColorPattern) ?? fallback.match(rgbColorPattern);

  if (!match) {
    return `rgba(75, 192, 192, ${alpha})`;
  }

  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
};

export const ScoreGraph = ({ players }: { players: Player[] }) => {
  const labels = getAllRounds();
  const [resolvedColors, setResolvedColors] = useState<string[]>(getColors());

  useEffect(() => {
    const updateColors = () => {
      const defaultFallbacks = getColors();
      const cssColors = [
        "var(--color-primary)",
        "var(--color-secondary)",
        "var(--color-accent)",
        "var(--color-info)",
        "var(--color-success)",
        "var(--color-warning)",
        "var(--color-error)",
        "var(--color-neutral)",
      ];

      const resolved = cssColors.map((cssVar, idx) => {
        return resolveCSSColor(cssVar, defaultFallbacks[idx] || "rgb(75, 192, 192)");
      });
      setResolvedColors(resolved);
    };

    updateColors();

    // Observe HTML element for theme attribute changes
    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style", "class"],
    });

    return () => observer.disconnect();
  }, []);

  const datasets = players.map((player, index) => {
    const lineColor = resolvedColors[index % resolvedColors.length];
    const fallbackColor = getColors()[index % getColors().length];
    const chartColor = toRgba(lineColor, 1, fallbackColor);
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
      fill: true,
      borderColor: chartColor,
      borderWidth: 3.5,
      tension: 0.4,
      pointRadius: 3.5,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColor,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 1.5,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, toRgba(lineColor, 0.22, fallbackColor));
        gradient.addColorStop(1, toRgba(lineColor, 0, fallbackColor));
        return gradient;
      },
    };
  });

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
          font: {
            family: "inherit",
            size: 11,
            weight: "bold" as const,
          },
          color: "rgba(128, 128, 128, 0.8)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleFont: {
          family: "inherit",
          size: 12,
          weight: "bold" as const,
        },
        bodyFont: {
          family: "inherit",
          size: 11,
        },
        padding: 10,
        cornerRadius: 12,
        boxPadding: 4,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "inherit",
            size: 10,
            weight: "bold" as const,
          },
          color: "rgba(128, 128, 128, 0.6)",
        },
      },
      y: {
        grid: {
          color: "rgba(128, 128, 128, 0.12)",
          tickBorderDash: [4, 4],
        },
        ticks: {
          font: {
            family: "inherit",
            size: 10,
            weight: "bold" as const,
          },
          color: "rgba(128, 128, 128, 0.6)",
        },
      },
    },
  };

  return (
    <div className="h-60 w-full">
      <Line options={options} data={data} />
    </div>
  );
};
