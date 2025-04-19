'use client'

import {
  Line
} from 'react-chartjs-2'
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
    // Extract time and value from energyData and update the chart
    const newLabels = energyData.map(d => d.time)
    const newDataPoints = energyData.map(d => d.value)

    setLabels(newLabels)
    setDataPoints(newDataPoints)
  }, [energyData])

  const data = {
    labels,
    datasets: [
      {
        label: 'Energy Usage (Watts)',
        data: dataPoints,
        fill: false,
        borderColor: '#4ade80', // Tailwind green-400
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
      },
    },
  }

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  )
}
