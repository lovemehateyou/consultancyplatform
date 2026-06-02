import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Filters = { category?: string; date?: string };
interface Props {
  category?: string;
  date?: string;
  onChange: (f: Filters) => void;
}

const ConsultancyFilters = ({ category = "all", date = "", onChange }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Select value={category} onValueChange={(v) => onChange({ category: v })}>
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
        className="bg-card border-border col-span-2"
        value={date}
        onChange={(e) => onChange({ date: (e.target as HTMLInputElement).value })}
      />
    </div>
  );
};

export default ConsultancyFilters;