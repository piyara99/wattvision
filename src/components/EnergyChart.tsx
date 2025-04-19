'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'

// Register chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

interface EnergyChartProps {
  energyData: { time: string; value: number }[]
}

export default function EnergyChart({ energyData }: EnergyChartProps) {
  const [labels, setLabels] = useState<string[]>([])
  const [dataPoints, setDataPoints] = useState<number[]>([])

  useEffect(() => {
    const newLabels = energyData.map(d => d.time)
    const newDataPoints = energyData.map(d => d.value)

    setLabels(newLabels)
    setDataPoints(newDataPoints)
  }, [energyData])

  const data = {
    labels,
    datasets: [
      {
        label: '', // Hide label
        data: dataPoints,
        fill: false,
        borderColor: '#6C4DBF', // Wattvision purple
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // hide x axis
      },
      y: {
        display: false, // hide y axis
      },
    },
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
  }

  return (
    <div className="h-24 w-full"> {/* Smaller height for small cards */}
      <Line data={data} options={options} />
    </div>
  )
}
