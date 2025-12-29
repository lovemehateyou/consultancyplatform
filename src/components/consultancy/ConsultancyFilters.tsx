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
          <SelectItem value="law">Law Consultant</SelectItem>
          <SelectItem value="finance">Finance Consultant</SelectItem>
          <SelectItem value="business">Business Consultant</SelectItem>
          <SelectItem value="ux">UX Copywriter</SelectItem>
          <SelectItem value="ui">UI Designer</SelectItem>
          <SelectItem value="product">Product Manager</SelectItem>
          <SelectItem value="qa">QA Engineer</SelectItem>
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

export default ConsultancyFilters;
