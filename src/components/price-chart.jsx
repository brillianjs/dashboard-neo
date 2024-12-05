import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PriceChart({ amount }) {
  const data = amount?.data?.map((item) => ({
    date: new Date(item.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
    buy_amount: item.buy_amount,
    sell_amount: item.sell_amount,
  }));

  return (
    <ChartContainer
      config={{
        buy_amount: {
          label: "Buy Amount",
          color: "hsl(var(--chart-1))",
        },
        sell_amount: {
          label: "Sell Amount",
          color: "hsl(var(--chart-2))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(tick) => tick.toFixed(9)} />
          <Tooltip
            formatter={(value) => value.toFixed(9)}
            content={<ChartTooltipContent />}
          />
          <Area
            type="monotone"
            dataKey="buy_amount"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
          />
          <Area
            type="monotone"
            dataKey="sell_amount"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
