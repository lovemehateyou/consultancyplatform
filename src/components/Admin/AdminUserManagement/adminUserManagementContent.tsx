import { useEffect, useMemo, useState } from "react";
import ConsultancyFilters from "./adminUserManagementFilters";
import ConsultantsTable from "./adminUserManagementTable";
import UsermanagementKPICards from "./adminUserManagementKPICards";
import AddUserDialog from "./AddUserDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { listAdminUsers, updateAdminUserRole, type AdminUser } from "@/services/adminUsers";
import { useToast } from "@/hooks/use-toast";

const ConsultancyContent = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [role, setRole] = useState("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await listAdminUsers({
          role: role === "all" ? undefined : role,
          search: search || undefined,
        });
        setUsers(response.data || []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load users.";
        toast({
          title: "User list unavailable",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [role, search, toast]);

  const roleCounts = useMemo(() => {
    const counts = { total: users.length, admin: 0, consultant: 0, user: 0 };
    users.forEach((user) => {
      if (user.role === "admin") counts.admin += 1;
      if (user.role === "consultant") counts.consultant += 1;
      if (user.role === "user") counts.user += 1;
    });
    return counts;
  }, [users]);

  const handleRoleUpdate = async (userId: string, nextRole: AdminUser["role"]) => {
    try {
      const updated = await updateAdminUserRole(userId, nextRole);
      setUsers((prev) =>
        prev.map((user) => (user.id === updated.id ? { ...user, role: updated.role } : user))
      );
      toast({
        title: "Role updated",
        description: `Updated ${updated.email} to ${updated.role}.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update role.";
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <UsermanagementKPICards
        totalUsers={roleCounts.total}
        adminUsers={roleCounts.admin}
        consultantUsers={roleCounts.consultant}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>

        <Button 
          onClick={() => setAddUserOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="space-y-6">
        <ConsultancyFilters
          role={role}
          search={search}
          onRoleChange={setRole}
          onSearchChange={setSearch}
        />
        <ConsultantsTable
          users={users}
          isLoading={isLoading}
          onRoleUpdate={handleRoleUpdate}
        />
      </div>

      <AddUserDialog open={addUserOpen} onOpenChange={setAddUserOpen} />
    </div>
  );
};

export default ConsultancyContent;
