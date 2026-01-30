import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ConsultancyFiltersProps {
  role: string;
  search: string;
  onRoleChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const ConsultancyFilters = ({ role, search, onRoleChange, onSearchChange }: ConsultancyFiltersProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Select value={role} onValueChange={onRoleChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="consultant">Consultant</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="bg-card border-border"
      />
    </div>
  );
};

export default ConsultancyFilters;
