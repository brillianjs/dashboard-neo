import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriceChart } from "@/components/price-chart";
import { VolumeChart } from "@/components/volume-chart";
import { DistributionChart } from "@/components/distribution-chart";
import TableTransaction from "@/components/table-transaction";
import { socket } from "@/socket";
import { Skeleton } from "@/components/ui/skeleton";
import CardSolTransaction from "@/components/card-sol-transaction";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [dex, setDex] = useState(null);
  const [amount, setAmount] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [statusPerDay, setStatusPerDay] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    orderBy: "created_at",
    order: "desc",
  });

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("amount/day");
      socket.emit("dex");
      socket.emit("transaction/day");
      socket.emit("status/day");
      socket.emit("transaction_history", filter);
      socket.emit("error");

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("dex", (dex) => {
      setDex(dex);
    });

    socket.on("amount/day", (amount) => {
      setAmount(amount);
    });

    socket.on("transaction/day", (tx) => {
      setTransaction(tx);
    });

    socket.on("status/day", (status) => {
      setStatusPerDay(status);
    });

    socket.on("transaction_history", (history) => {
      setTransactionHistory(history);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.emit("transaction_history", filter);
  }, [filter]);

  return (
    <div className="p-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Neoscoop Dashboard</h1>
        <Button
          onClick={() =>
            signOut({ redirect: false }).then(() => {
              router.push("/auth/signin");
            })
          }
        >
          Sign Out
        </Button>
      </div>
      <CardSolTransaction statusPerDay={statusPerDay} amount={amount} />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sol Amount Chart</CardTitle>
            <CardDescription>Buy and Sell Amounts Over Time</CardDescription>
          </CardHeader>
          <CardContent>
            <PriceChart amount={amount} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
            <CardDescription>Daily buy and sell volume</CardDescription>
          </CardHeader>
          <CardContent>
            <VolumeChart tx={transaction} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribution Chart</CardTitle>
            <CardDescription>Chart of the distribution of DEX</CardDescription>
          </CardHeader>
          <CardContent>
            <DistributionChart dex={dex} />
          </CardContent>
        </Card>
      </div>
      <div className="w-full py-6">
        <Card>
          <CardHeader>
            <CardTitle>Table Transaction</CardTitle>
            <CardDescription>
              List of all transactions in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableTransaction setFilter={setFilter} tx={transactionHistory} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}