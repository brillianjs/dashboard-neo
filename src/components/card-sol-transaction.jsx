import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSolTransaction({ amount, statusPerDay }) {
  return (
    <div className="grid  gap-6 md:grid-cols-5 lg:grid-cols-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">SOL Today</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-rows-2 divide-y">
          <div className="flex  flex-col ">
            <h2 className=" font-bold text-blue-300">Buy</h2>
            {amount ? (
              <p className="font-bold mt-2 text-center">
                {amount?.data[0].buy_amount}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>

          <div className="flex flex-col py-2">
            <h2 className=" font-bold text-red-300">Sell</h2>
            {amount ? (
              <p className="font-bold mt-2 text-center">
                {amount?.data[0].sell_amount}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">SOL This Week</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-rows-2 divide-y">
          <div className="flex  flex-col ">
            <h2 className=" font-bold text-blue-300">Buy</h2>

            {amount ? (
              <p className="font-bold mt-2 text-center">
                {amount?.data
                  .filter((item) => {
                    const date = new Date(item.date);
                    const today = new Date();
                    const diffTime = Math.abs(today - date);
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24)
                    );
                    return diffDays <= 7;
                  })
                  .reduce((total, item) => total + item.buy_amount, 0)}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>

          <div className="flex flex-col py-2">
            <h2 className=" font-bold text-red-300">Sell</h2>

            {amount ? (
              <p className="font-bold mt-2 text-center">
                {amount?.data
                  .filter((item) => {
                    const date = new Date(item.date);
                    const today = new Date();
                    const diffTime = Math.abs(today - date);
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24)
                    );
                    return diffDays <= 7;
                  })
                  .reduce((total, item) => total + item.sell_amount, 0)}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">SOL This Month</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-rows-2 divide-y">
          <div className="flex  flex-col ">
            <h2 className=" font-bold text-blue-300">Buy</h2>

            {amount ? (
              <p className="font-bold mt-2 text-center">
                {amount?.data
                  .filter((item) => {
                    const date = new Date(item.date);
                    const today = new Date();
                    return (
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear()
                    );
                  })
                  .reduce((total, item) => total + item.buy_amount, 0)}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>

          <div className="flex flex-col py-2">
            <h2 className="font-bold text-red-300">Sell</h2>

            {amount ? (
              <p className=" font-bold mt-2 text-center">
                {amount?.data
                  .filter((item) => {
                    const date = new Date(item.date);
                    const today = new Date();
                    return (
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear()
                    );
                  })
                  .reduce((total, item) => total + item.sell_amount, 0)}{" "}
                <span className="text-sm">SOL</span>
              </p>
            ) : (
              <Skeleton className="w-full  py-3 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-rows-3 ">
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-green-300">
                <span className="text-sm">Success</span>
                <p className="text-center">:</p>
                <span>{statusPerDay?.data[0]?.success}</span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-red-300">
                <span className="text-sm">Failed</span>
                <p className="text-center">:</p>
                <span>{statusPerDay?.data[0]?.failed}</span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-yellow-300">
                <span className="text-sm">Waiting</span>
                <p className="text-center">:</p>
                <span>{statusPerDay?.data[0]?.waiting}</span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center ">
                <span className="text-sm">Total</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data[0]?.success +
                    statusPerDay?.data[0]?.failed +
                    statusPerDay?.data[0]?.waiting}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-rows-3 ">
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-green-300">
                <span className="text-sm">Success</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      const diffTime = Math.abs(today - date);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7;
                    })
                    .reduce((total, item) => total + item.success, 0)}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-red-300">
                <span className="text-sm">Failed</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      const diffTime = Math.abs(today - date);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7;
                    })
                    .reduce((total, item) => total + item.failed, 0)}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-yellow-300">
                <span className="text-sm">Waiting</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      const diffTime = Math.abs(today - date);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7;
                    })
                    .reduce((total, item) => total + item.waiting, 0)}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center ">
                <span className="text-sm">Total</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      const diffTime = Math.abs(today - date);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7;
                    })
                    .reduce(
                      (total, item) =>
                        total + item.success + item.failed + item.waiting,
                      0
                    )}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-rows-3 ">
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-green-300">
                <span className="text-sm">Success</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      return (
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear()
                      );
                    })
                    .reduce((total, item) => total + item.success, 0)}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-red-300">
                <span className="text-sm">Failed</span>
                <p className="text-center">:</p>
                <span>10</span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}

            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center text-yellow-300">
                <span className="text-sm">Waiting</span>
                <p className="text-center">:</p>
                <span>10</span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
            {statusPerDay ? (
              <div className="grid grid-cols-3 justify-center items-center">
                <span className="text-sm">Total</span>
                <p className="text-center">:</p>
                <span>
                  {statusPerDay?.data
                    .filter((item) => {
                      const date = new Date(item.date);
                      const today = new Date();
                      return (
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear()
                      );
                    })
                    .reduce(
                      (total, item) =>
                        total + item.success + item.failed + item.waiting,
                      0
                    )}
                </span>
              </div>
            ) : (
              <Skeleton className="w-full  py-1.5 my-2" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
