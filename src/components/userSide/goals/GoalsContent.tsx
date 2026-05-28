import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  listGoals,
  listMyGoals,
  startGoal,
  type Goal,
  type UserGoal,
} from "@/services/goals";
import { Flag, Search, Target } from "lucide-react";

const GoalsContent = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [userGoals, setUserGoals] = useState<UserGoal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingId, setIsSavingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const userGoalMap = useMemo(() => {
    const map = new Map<number, UserGoal>();
    userGoals.forEach((userGoal) => {
      map.set(userGoal.goalId, userGoal);
    });
    return map;
  }, [userGoals]);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [goalResponse, userGoalResponse] = await Promise.all([
        listGoals(),
        listMyGoals(),
      ]);
      setGoals(goalResponse.goals ?? []);
      setUserGoals(userGoalResponse ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load goals right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGoals();
  }, [fetchGoals]);

  const filteredGoals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return goals;
    return goals.filter((goal) => {
      return (
        goal.title.toLowerCase().includes(query) ||
        goal.category.toLowerCase().includes(query) ||
        (goal.businessArea ?? "").toLowerCase().includes(query) ||
        (goal.businessType ?? "").toLowerCase().includes(query)
      );
    });
  }, [goals, searchQuery]);

  const handleStartGoal = async (goalId: number) => {
    setIsSavingId(goalId);
    setErrorMessage(null);
    try {
      await startGoal(goalId);
      const updatedGoals = await listMyGoals();
      setUserGoals(updatedGoals ?? []);
      toast({
        title: "Goal started",
        description: "This goal has been added to your tasks.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start this goal.";
      setErrorMessage(message);
      toast({ title: "Goal start failed", description: message, variant: "destructive" });
    } finally {
      setIsSavingId(null);
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-background overflow-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Flag className="w-5 h-5 text-blue-600" />
            Available Goals
          </h1>
          <p className="text-sm text-muted-foreground">
            Pick a goal to pursue. Goals are filtered to match your business profile.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search goals"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive mb-4">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
          Loading goals...
        </div>
      ) : filteredGoals.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredGoals.map((goal) => {
            const userGoal = userGoalMap.get(goal.id);
            const isStarted = Boolean(userGoal);
            const statusLabel = userGoal?.status?.replace("_", " ");
            return (
              <Card key={goal.id} className="border-border/60 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {goal.title}
                      </h3>
                      {goal.description ? (
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description}
                        </p>
                      ) : null}
                    </div>
                    <Button
                      onClick={() => handleStartGoal(goal.id)}
                      disabled={isStarted || isSavingId === goal.id}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isStarted ? "Started" : isSavingId === goal.id ? "Starting..." : "Start"}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{goal.category}</Badge>
                    <Badge variant="outline">{goal.businessArea || "All areas"}</Badge>
                    <Badge variant="outline">{goal.businessType || "All types"}</Badge>
                    {statusLabel ? (
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {statusLabel}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>{goal.Tasks?.length ?? 0} tasks in this goal</span>
                  </div>

                  {goal.Tasks?.length ? (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {goal.Tasks.slice(0, 4).map((task) => (
                        <li key={task.id}>{task.title}</li>
                      ))}
                      {goal.Tasks.length > 4 ? (
                        <li>And {goal.Tasks.length - 4} more tasks</li>
                      ) : null}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks defined yet.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
          No goals match your search.
        </div>
      )}
    </div>
  );
};

export default GoalsContent;
