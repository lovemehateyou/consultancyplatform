import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LibraryFiltersProps {
  filters: {
    category: string;
    date: string;
    access: string;
  };
  categories: string[];
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onAccessChange: (value: string) => void;
}

const LibraryFilters = ({ filters, categories, onCategoryChange, onDateChange, onAccessChange }: LibraryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select value={filters.category} onValueChange={onCategoryChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
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
    </div>
  );
};

export default LibraryFilters;
