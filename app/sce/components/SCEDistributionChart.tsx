"use client"

import { useEffect, useState } from "react"

type DataItem = {
  label: string
  value: number
  color: string
}

const data: DataItem[] = [
  { label: "SCE", value: 2431, color: "#ef4444" },
  { label: "Not SCE", value: 5892, color: "#22c55e" },
  { label: "Not Assessed", value: 34, color: "#9ca3af" },
]

const radius = 90
const strokeWidth = 28
const circumference = 2 * Math.PI * radius

export default function SceDistributionChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  const [drawDonut, setDrawDonut] = useState(false)
  const [showLines, setShowLines] = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  useEffect(() => {
    setTimeout(() => setDrawDonut(true), 200)
    setTimeout(() => setShowLines(true), 1200)
    setTimeout(() => setShowLabels(true), 1800)
  }, [])

  let accumulatedOffset = 0

  return (
    <div className="flex justify-center items-center">
      <svg width="400" height="400" viewBox="0 0 400 400">

        {/* DONUT GROUP */}
        <g transform="translate(200,200) rotate(-90)">
          {data.map((item, i) => {
            const fraction = item.value / total
            const arcLength = circumference * fraction

            const circle = (
              <circle
                key={i}
                r={radius}
                cx={0}
                cy={0}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={
                  drawDonut ? -accumulatedOffset : circumference
                }
                style={{
                  transition: "stroke-dashoffset 1s ease",
                }}
                strokeLinecap="round"
              />
            )

            accumulatedOffset += arcLength
            return circle
          })}
        </g>

        {/* CALLOUT LINES */}
        <g stroke="white" strokeWidth={2} fill="none">
          {[
            "M 300 160 L 340 140",
            "M 100 220 L 60 240",
            "M 260 280 L 300 300",
          ].map((path, i) => (
            <path
              key={i}
              d={path}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={showLines ? 0 : 1}
              style={{
                transition: "stroke-dashoffset 0.6s ease",
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
              }}
            />
          ))}
        </g>

        {/* LABELS */}
        <g
          style={{
            opacity: showLabels ? 1 : 0,
            transform: `translateY(${showLabels ? 0 : 10}px)`,
            transition: "all 0.4s ease",
          }}
          fill="white"
          fontSize="14"
        >
          <text x="345" y="135">SCE: 2431</text>
          <text x="20" y="250">Not SCE: 5892</text>
          <text x="305" y="320">Not Assessed: 34</text>
        </g>

        {/* CENTER TEXT */}
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="bold"
        >
          TOTAL
        </text>
        <text
          x="200"
          y="225"
          textAnchor="middle"
          fill="white"
          fontSize="22"
        >
          {total}
        </text>
      </svg>
    </div>
  )
}