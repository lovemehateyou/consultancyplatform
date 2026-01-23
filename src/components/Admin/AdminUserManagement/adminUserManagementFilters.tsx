import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ConsultancyFilters = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Select>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="consultant">Consultant</SelectItem>
          <SelectItem value="client">Client</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConsultancyFilters;
