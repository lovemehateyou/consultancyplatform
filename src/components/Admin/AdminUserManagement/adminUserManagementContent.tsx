import { useState } from "react";
import ConsultancyFilters from "./adminUserManagementFilters";
import ConsultantsTable from "./adminUserManagementTable";
import UsermanagementKPICards from "./adminUserManagementKPICards";
import AddUserDialog from "./AddUserDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ConsultancyContent = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <UsermanagementKPICards
        totalTasks={150}
        activeTasks={75}
        consultantTypes={10}
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
        <ConsultancyFilters />
        <ConsultantsTable />
      </div>

      <AddUserDialog open={addUserOpen} onOpenChange={setAddUserOpen} />
    </div>
  );
};

export default ConsultancyContent;
