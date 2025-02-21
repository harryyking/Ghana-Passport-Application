import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TaskProgress() {
  const tasks = [
    {
      name: "Document Upload",
      progress: 80,
      status: "In Progress",
    },
    {
      name: "Biometric Capture",
      progress: 0,
      status: "Pending",
    },
    {
      name: "Application Review",
      progress: 0,
      status: "Not Started",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{task.name}</span>
                <span className="text-gray-500">{task.status}</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

