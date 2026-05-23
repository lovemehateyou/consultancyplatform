import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

export interface Transaction {
  id: string;
  transactionId: string;
  clientName: string;
  consultantName: string;
  billingDate: string;
  status: "paid" | "unpaid";
  amount: string;
}

interface TransactionManagementTableProps {
  transactions: Transaction[];
  selectedIds: string[];
  onSelectTransaction: (id: string) => void;
  onSelectAll: () => void;
}

const TransactionManagementTable = ({
  transactions,
  selectedIds,
  onSelectTransaction,
  onSelectAll,
}: TransactionManagementTableProps) => {
  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            Paid
          </Badge>
        );
      case "unpaid":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200"
          >
            Unpaid
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox
                checked={
                  transactions.length > 0 &&
                  selectedIds.length === transactions.length
                }
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="font-medium">Transaction Id</TableHead>
            <TableHead className="font-medium">Client</TableHead>
            <TableHead className="font-medium">Consultant</TableHead>
            <TableHead className="font-medium">
              <div className="flex items-center gap-1 cursor-pointer">
                BILLING DATE
                <ChevronDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="font-medium">STATUS</TableHead>
            <TableHead className="font-medium">AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(transaction.id)}
                    onCheckedChange={() => onSelectTransaction(transaction.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {transaction.transactionId}
                </TableCell>
                <TableCell className="text-foreground">
                  {transaction.clientName}
                </TableCell>
                <TableCell className="text-foreground">
                  {transaction.consultantName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.billingDate}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="font-medium text-foreground">
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionManagementTable;
