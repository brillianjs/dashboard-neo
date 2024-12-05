"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function DistributionChart({ dex }) {
  const chartData = [
    {
      browser: "pumpfun",
      visitors: dex?.data?.pumpfun,
      fill: "var(--color-pumpfun)",
    },
    {
      browser: "raydium",
      visitors: dex?.data?.raydium_amm,
      fill: "var(--color-raydium)",
    },
  ];

  const chartConfig = {
    pumpfun: {
      label: "Pumpfun",
      color: "hsl(var(--chart-1))",
    },
    raydium: {
      label: "Raydium",
      color: "#BB08F8",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy || 0}
                      className="fill-muted-foreground font-semibold text-xl"
                    >
                      {dex?.data?.all ?? 0}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
