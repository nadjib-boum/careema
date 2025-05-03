"use client"

import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  count: {
    label: "count",
  },
  withCHD: {
    label: "With CHD",
  },
  withoutCHD: {
    label: "Without CHD",
  },
} satisfies ChartConfig

export function DiseaseChart ({ withCHDReportsCount, withoutCHDReportsCount }: { withCHDReportsCount: number; withoutCHDReportsCount: number }) {

  const chartData = [
    { status: "withCHD", count: withCHDReportsCount, fill: "#ff6467" },
    { status: "withoutCHD", count: withoutCHDReportsCount, fill: "#05df72" },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Prevalence of Disease X in Total Patients</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default DiseaseChart