import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal } from "lucide-react";

interface TransactionManagementFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TransactionManagementFilters = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: TransactionManagementFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-transparent border-b border-border rounded-none w-auto h-auto p-0 gap-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Paid
          </TabsTrigger>
          <TabsTrigger
            value="unpaid"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Unpaid
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID, client, consultant, amount..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
};

export default TransactionManagementFilters;
