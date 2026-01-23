import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LibraryFiltersProps {
  filters: {
    category: string;
    date: string;
    access: string;
  };
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onAccessChange: (value: string) => void;
}

const LibraryFilters = ({ filters, onCategoryChange, onDateChange, onAccessChange }: LibraryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Select value={filters.category} onValueChange={onCategoryChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="design">Design Systems</SelectItem>
          <SelectItem value="accessibility">Accessibility</SelectItem>
          <SelectItem value="tech">Tech</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        className="bg-card border-border"
        placeholder="mm/dd/yyyy"
        value={filters.date}
        onChange={(event) => onDateChange(event.target.value)}
      />

      <Select value={filters.access} onValueChange={onAccessChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="Paid / Free" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Paid / Free</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="free">Free</SelectItem>
        </SelectContent>
      </Select>

      <Button className="bg-blue-600 hover:bg-blue-700 text-primary-foreground rounded-lg px-6">
        Upload Material
      </Button>

    </div>
  );
};

export default LibraryFilters;
