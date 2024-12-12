import { Link as LinkIcon } from "lucide-react";
import { socket } from "@/socket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";

export default function TableTransaction({ tx, setFilter }) {
  const columns = [
    "wallet_address",
    "dex",
    "pair_address",
    "token_address",
    "amount",
    "signature",
    "transaction_type",
    "error_message",
    "status",
    "log_message",
    "created_at",
    "note",
    "order_code",
  ];

  const handleLimitChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      limit: parseInt(value, 10),
      page: 1, // Reset to first page when limit changes
    }));
  };

  const handlePageChange = (newPage) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: newPage,
    }));
  };

  const {
    total = 0,
    page = 1,
    limit = 10,
    totalPages = 1,
  } = tx?.metadata || {};

  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={i === page}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (page >= 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              className={"cursor-pointer"}
              onClick={() => handlePageChange(1)}
              isActive={1 === page}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page > halfMaxPagesToShow + 2) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(2, page - halfMaxPagesToShow);
      const endPage = Math.min(totalPages - 1, page + halfMaxPagesToShow);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={i === page}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPages - halfMaxPagesToShow - 1) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      if (page <= totalPages) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={totalPages === page}
              className={"cursor-pointer"}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="py-10">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="whitespace-nowrap">
                {column
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tx?.data.map((item, idx) => (
            <TableRow key={item.transaction_id}>
              <TableCell>
                <Link href={"#"}>
                  <p className="truncate hover:text-blue-500 transition-all max-w-[250px] text-xs overflow-hidden rounded-lg p-1 cursor-pointer">
                    {item.wallet_address}
                  </p>
                </Link>
              </TableCell>
              <TableCell>
                {item.dex === "raydium_amm" ? (
                  <Image
                    src="/raydium.png"
                    alt="Raydium"
                    width={32}
                    height={32}
                  />
                ) : (
                  <Image
                    src="/pumpfun.png"
                    alt="Serum"
                    width={32}
                    height={32}
                  />
                )}
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">{item.pair_address}</p>
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">{item.token_address}</p>
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">
                  {item.order.amount_sol} SOL
                </p>
              </TableCell>
              <TableCell>
                <Button>
                  <LinkIcon />
                </Button>
              </TableCell>
              <TableCell>
                <p
                  className={`${
                    item.transaction_type == "sell"
                      ? "text-red-500"
                      : "text-blue-500"
                  } font-semibold`}
                >
                  {item.transaction_type.toUpperCase()}
                </p>
              </TableCell>
              <TableCell>
                {/* <p className="truncate max-w-[250px]">{item.error_message}</p> */}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    item.status == "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {item.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">{item.log_message}</p>
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </TableCell>

              <TableCell>
                <p className="truncate max-w-[250px]">{item.note}</p>
              </TableCell>
              <TableCell>
                <p className="truncate max-w-[250px]">{item.order_code}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between items-center py-5">
        <div className="flex flex-row justify-center items-center gap-4">
          <Select onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Per Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs italic">Total {total} transactions</p>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              {page !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className={"cursor-pointer"}
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>
              )}
              {renderPaginationItems()}
              {page !== totalPages && (
                <PaginationItem>
                  <PaginationNext
                    className={"cursor-pointer"}
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
