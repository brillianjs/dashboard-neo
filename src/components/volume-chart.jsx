import {
  Bar,
  BarChart,
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

export function VolumeChart({ tx }) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const data =
    tx &&
    tx.data
      .filter((item) => new Date(item.date) >= oneWeekAgo)
      .map((item) => ({
        date: new Date(item.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
        buy: item.buy,
        sell: item.sell,
      }));

  return (
    <ChartContainer
      config={{
        buy: {
          label: "Buy Volume",
          color: "rgb(146,197,253)",
        },
        sell: {
          label: "Sell Volume",
          color: "rgb(253,146,146)",
        },
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="buy" fill="rgb(146,197,253)" />
          <Bar dataKey="sell" fill="rgb(253,146,146)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
