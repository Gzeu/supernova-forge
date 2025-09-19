'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { ProjectAssistant } from '@/lib/ai/project-assistant';
import { SmartContractGenerator } from '@/lib/blockchain/smart-contract-generator';

interface ProjectDashboardProps {
  projectId: string;
  projectName: string;
  projectType: 'defi' | 'nft' | 'dao' | 'gaming' | 'custom';
}

interface ProjectMetrics {
  completion: number;
  velocity: number;
  qualityScore: number;
  risksCount: number;
  tasksCompleted: number;
  tasksPending: number;
  activeBlockers: number;
}

interface AIInsight {
  type: 'recommendation' | 'warning' | 'optimization' | 'milestone';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action?: string;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projectId,
  projectName,
  projectType
}) => {
  const [metrics, setMetrics] = useState<ProjectMetrics>({
    completion: 0,
    velocity: 0,
    qualityScore: 0,
    risksCount: 0,
    tasksCompleted: 0,
    tasksPending: 0,
    activeBlockers: 0
  });
  
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [contractTemplates, setContractTemplates] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Initialize AI assistant and contract generator
  useEffect(() => {
    loadProjectData();
    loadContractTemplates();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      // Simulate loading project metrics
      setMetrics({
        completion: 68,
        velocity: 12,
        qualityScore: 85,
        risksCount: 3,
        tasksCompleted: 24,
        tasksPending: 11,
        activeBlockers: 2
      });
    } catch (error) {
      console.error('Error loading project data:', error);
    }
  };

  const loadContractTemplates = async () => {
    try {
      const generator = new SmartContractGenerator(null as any);
      const templates = generator.getAllTemplates();
      setContractTemplates(templates);
    } catch (error) {
      console.error('Error loading contract templates:', error);
    }
  };

  const generateAIInsights = async () => {
    setIsLoadingInsights(true);
    try {
      // Simulate AI insights generation
      const mockInsights: AIInsight[] = [
        {
          type: 'recommendation',
          title: 'Smart Contract Optimization',
          description: 'Consider implementing batch operations to reduce gas costs by up to 40%',
          priority: 'high',
          action: 'Review gas optimization patterns'
        },
        {
          type: 'warning',
          title: 'Security Review Needed',
          description: 'Smart contract lacks proper access control mechanisms',
          priority: 'critical',
          action: 'Schedule security audit'
        },
        {
          type: 'optimization',
          title: 'Frontend Performance',
          description: 'Implement code splitting to improve load times by 25%',
          priority: 'medium',
          action: 'Refactor component structure'
        },
        {
          type: 'milestone',
          title: 'Ready for Testnet',
          description: 'All core features implemented, ready for testnet deployment',
          priority: 'high',
          action: 'Deploy to testnet'
        }
      ];
      
      setInsights(mockInsights);
    } catch (error) {
      console.error('Error generating AI insights:', error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'milestone': return <CheckCircle2 className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {projectName}
            </h1>
            <p className="text-muted-foreground mt-2 capitalize">
              {projectType} dApp Development Dashboard
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={generateAIInsights} disabled={isLoadingInsights}>
              <Brain className="mr-2 h-4 w-4" />
              {isLoadingInsights ? 'Analyzing...' : 'AI Insights'}
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completion}%</div>
              <Progress value={metrics.completion} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Velocity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.velocity}</div>
              <p className="text-xs text-muted-foreground">tasks/week</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.qualityScore}%</div>
              <p className="text-xs text-muted-foreground">code quality</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.risksCount}</div>
              <p className="text-xs text-muted-foreground">require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Project Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tasks Completed</span>
                    <span className="text-sm text-muted-foreground">
                      {metrics.tasksCompleted}/{metrics.tasksCompleted + metrics.tasksPending}
                    </span>
                  </div>
                  <Progress value={(metrics.tasksCompleted / (metrics.tasksCompleted + metrics.tasksPending)) * 100} />
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{metrics.tasksCompleted}</div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{metrics.tasksPending}</div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Development Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Smart Contracts</span>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frontend Integration</span>
                      <Badge variant="outline">Planning</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Testing Suite</span>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documentation</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Blockers */}
            {metrics.activeBlockers > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Active Blockers Detected</AlertTitle>
                <AlertDescription>
                  There are {metrics.activeBlockers} blockers that need immediate attention to maintain project velocity.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Smart Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Available Contract Templates
                </CardTitle>
                <CardDescription>
                  Choose from pre-built smart contract templates optimized for {projectType} applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contractTemplates.map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:border-primary/50 transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Deploy Cost:</span>
                            <Badge variant="outline">{template.deploymentCost}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 3).map((feature: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          Deploy Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Project Insights
                </CardTitle>
                <CardDescription>
                  Automated analysis and recommendations for project optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                {insights.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No insights generated yet.</p>
                    <Button onClick={generateAIInsights} className="mt-4">
                      Generate AI Insights
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              {getTypeIcon(insight.type)}
                              {insight.title}
                            </CardTitle>
                            <Badge variant={getPriorityColor(insight.priority) as any}>
                              {insight.priority}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground mb-3">
                            {insight.description}
                          </p>
                          {insight.action && (
                            <Button size="sm" variant="outline">
                              {insight.action}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Completed Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Smart contract base structure', 'Frontend setup', 'Wallet integration', 'Basic UI components'].map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="line-through text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Security audit', 'Gas optimization', 'Error handling', 'Documentation'].map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Project Analytics
                </CardTitle>
                <CardDescription>
                  Detailed metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">85%</div>
                    <p className="text-sm text-muted-foreground">Code Quality</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">12</div>
                    <p className="text-sm text-muted-foreground">Tasks/Week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">3</div>
                    <p className="text-sm text-muted-foreground">Active Risks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDashboard;