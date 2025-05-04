"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SeizureRecord {
  date: string;
  day: string;
  time: string;
}

interface AreaChartComponentProps {
  data: SeizureRecord[];
}

const chartConfig = {
  seizures: {
    label: "Seizures",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaChartComponent({ data }: AreaChartComponentProps) {
  const countMap: Record<string, number> = {};
  data.forEach((entry) => {
    if (!countMap[entry.date]) {
      countMap[entry.date] = 0;
    }
    countMap[entry.date]++;
  });
  const chartData = Object.entries(countMap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <Card className="p-0 border-none shadow-none">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="w-full h-[140px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-seizures)"
              fillOpacity={0.4}
              stroke="var(--color-seizures)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
