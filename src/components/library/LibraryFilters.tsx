import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const LibraryFilters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select>
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
      />

      <Select>
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
