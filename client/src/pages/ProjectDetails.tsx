
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Clock } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16">Loading...</div>;
  }

  if (!project) {
    return <div className="container mx-auto px-4 py-16">Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="bg-card border-gray-700 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-white text-2xl">{project.title}</CardTitle>
            <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-500">
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-light-text">
              <DollarSign className="h-4 w-4 mr-2 text-secondary" />
              <span>{project.budget}</span>
            </div>
            <div className="flex items-center text-light-text">
              <Clock className="h-4 w-4 mr-2 text-secondary" />
              <span>{project.timeframe}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white mb-2">Description</h3>
            <p className="text-light-text">{project.description}</p>
          </div>
          
          <div>
            <h3 className="text-white mb-2">Requirements</h3>
            <p className="text-light-text">{project.requirements}</p>
          </div>
          
          <div>
            <h3 className="text-white mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills?.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-primary/50 text-secondary border-secondary/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
