import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LibraryFiltersProps {
  filters: {
    category: string;
    date: string;
  };
  categories: string[];
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const LibraryFilters = ({ filters, categories, onCategoryChange, onDateChange }: LibraryFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};

export default LibraryFilters;
