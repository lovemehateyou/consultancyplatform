import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LibraryFiltersProps {
  filters: {
    category: string;
    date: string;
  };
  categories: string[];
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onUploadClick: () => void;
}

const LibraryFilters = ({ filters, categories, onCategoryChange, onDateChange, onUploadClick }: LibraryFiltersProps) => {
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

      <Button 
        onClick={onUploadClick}
        className="bg-blue-600 hover:bg-blue-700 text-primary-foreground rounded-lg px-6"
      >
        Upload Material
      </Button>

    </div>
  );
};

export default LibraryFilters;
