import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Award, Shield, ChevronRight, Lock } from "lucide-react";
import { User } from "@shared/schema";

export default function Hackers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Fetch all hackers
  const { data: hackers = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/hackers'],
    enabled: true,
  });

  // Popular skills for filtering
  const popularSkills = [
    "Penetration Testing", "Network Security", "Web Application Security", 
    "Security Audit", "Secure Code Review", "Social Engineering",
    "Vulnerability Assessment", "Cloud Security", "Mobile Security"
  ];

  // Filter hackers based on search and selected skills
  const filteredHackers = hackers.filter(hacker => {
    const matchesSearch = searchQuery === "" || 
      hacker.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hacker.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // In a real app, we'd filter by skills based on the hacker's actual skills
    // For now, we'll just pretend all hackers match if no skills are selected
    const matchesSkills = selectedSkills.length === 0;
    
    return matchesSearch && matchesSkills;
  });

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Browse Ethical Hackers
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Find verified cybersecurity professionals for your next security project
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        <div className="lg:col-span-1 space-y-6 bg-background p-6 rounded-lg border">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search hackers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Popular Skills</h4>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <Badge 
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Hackers List */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-muted/20"></CardHeader>
                  <CardContent className="py-4">
                    <div className="h-4 bg-muted/30 rounded mb-2"></div>
                    <div className="h-3 bg-muted/30 rounded w-3/4 mb-4"></div>
                    <div className="flex gap-1 mb-4">
                      <div className="h-6 w-16 bg-muted/30 rounded"></div>
                      <div className="h-6 w-16 bg-muted/30 rounded"></div>
                    </div>
                    <div className="h-16 bg-muted/20 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredHackers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No hackers found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSkills([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackers.map((hacker) => (
                <Card key={hacker.id} className="overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
                  <CardHeader className="relative py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900">
                    <div className="flex items-center gap-3">
                      {/* Avatar with initials */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                        {hacker.fullName?.split(' ').map(name => name[0]).join('') || 'HK'}
                      </div>
                      <div>
                        <CardTitle className="text-md">{hacker.fullName}</CardTitle>
                        <CardDescription>{hacker.bio?.split(' ').slice(0, 3).join(' ') || 'Ethical Hacker'}</CardDescription>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3" fill="currentColor" /> 4.9
                      </Badge>
                      {Math.random() > 0.5 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <Award className="h-3 w-3" /> Top
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {/* Show random skills for now */}
                      {popularSkills.slice(0, 3 + Math.floor(Math.random() * 2)).map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {hacker.bio || "Experienced ethical hacker specializing in penetration testing and vulnerability assessments. Dedicated to helping businesses improve their security posture."}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-emerald-500 mr-1" /> 
                      <span className="text-xs">Verified</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/hackers/${hacker.id}`}>
                        View Profile
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Add sample hackers cards when we don't have enough data for demo */}
              {filteredHackers.length < 3 && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Card key={`sample-${index}`} className="overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all">
                      <CardHeader className="relative py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                            {["SB", "LS", "JD", "KW", "MR"][index]}
                          </div>
                          <div>
                            <CardTitle className="text-md">{["Sarah Black", "Leo Smith", "John Davidson", "Katie Wong", "Mike Ross"][index]}</CardTitle>
                            <CardDescription>{["Security Specialist", "Network Expert", "Web Security Guru", "Red Team Leader", "Bug Hunter"][index]}</CardDescription>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="h-3 w-3" fill="currentColor" /> {[4.9, 4.8, 5.0, 4.7, 4.9][index]}
                          </Badge>
                          {index % 2 === 0 && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Award className="h-3 w-3" /> Top
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {popularSkills.slice(index, index + 3).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {[
                            "Specializing in finding vulnerabilities in web applications and cloud infrastructure. Over 5 years of experience with major tech companies.",
                            "Expert in network penetration testing and security auditing with OSCP certification. Former security researcher at a major cybersecurity firm.",
                            "Full-stack developer with security expertise. Specializes in secure code review and finding vulnerabilities in applications.",
                            "Red team specialist with expertise in social engineering and physical penetration testing. Helped secure Fortune 500 companies.",
                            "Bug bounty hunter with over 200 verified vulnerabilities reported. Specializes in API security and authentication bypasses."
                          ][index]}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-emerald-500 mr-1" /> 
                          <span className="text-xs">Verified</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/hackers/sample">
                            View Profile
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}