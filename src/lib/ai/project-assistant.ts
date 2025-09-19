import { OpenAI } from 'openai';

interface ProjectContext {
  name: string;
  description: string;
  type: 'defi' | 'nft' | 'dao' | 'gaming' | 'custom';
  complexity: 'simple' | 'moderate' | 'complex';
  timeline: string;
  budget?: string;
  requirements: string[];
  currentPhase: string;
  completedTasks: string[];
  pendingTasks: string[];
  blockers: string[];
}

interface AIRecommendation {
  type: 'task' | 'optimization' | 'warning' | 'milestone';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionItems: string[];
  estimatedTime: string;
  dependencies: string[];
}

interface CodeAnalysis {
  complexity: number;
  maintainability: number;
  testCoverage: number;
  securityIssues: string[];
  suggestions: string[];
  technicalDebt: string[];
}

interface ProjectMetrics {
  progress: number;
  velocity: number;
  qualityScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedCompletion: string;
  budgetUsage: number;
}

export class ProjectAssistant {
  private openai: OpenAI;
  private context: ProjectContext;

  constructor(apiKey: string, projectContext: ProjectContext) {
    this.openai = new OpenAI({ apiKey });
    this.context = projectContext;
  }

  // Generate comprehensive project roadmap
  async generateRoadmap(): Promise<{
    phases: Array<{
      name: string;
      duration: string;
      tasks: string[];
      deliverables: string[];
      risks: string[];
    }>;
    milestones: Array<{
      name: string;
      date: string;
      criteria: string[];
    }>;
    recommendations: AIRecommendation[];
  }> {
    const prompt = `
    Generate a detailed project roadmap for a ${this.context.type} MultiversX dApp project:
    
    Project: ${this.context.name}
    Description: ${this.context.description}
    Complexity: ${this.context.complexity}
    Timeline: ${this.context.timeline}
    Requirements: ${this.context.requirements.join(', ')}
    
    Please provide:
    1. Development phases with tasks and deliverables
    2. Key milestones with success criteria
    3. Risk assessment and mitigation strategies
    4. Resource allocation recommendations
    5. Testing and deployment strategy
    
    Focus on MultiversX blockchain specifics, smart contract development, and modern web3 practices.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      });

      const analysis = this.parseRoadmapResponse(response.choices[0].message.content || '');
      return analysis;
    } catch (error) {
      console.error('Error generating roadmap:', error);
      throw error;
    }
  }

  // Analyze current project status and provide recommendations
  async analyzeProject(): Promise<{
    metrics: ProjectMetrics;
    recommendations: AIRecommendation[];
    nextActions: string[];
    risks: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      impact: string;
      mitigation: string[];
    }>;
  }> {
    const projectStatus = `
    Project Status Analysis:
    - Current Phase: ${this.context.currentPhase}
    - Completed Tasks: ${this.context.completedTasks.length}
    - Pending Tasks: ${this.context.pendingTasks.length}
    - Active Blockers: ${this.context.blockers.length}
    
    Completed: ${this.context.completedTasks.join(', ')}
    Pending: ${this.context.pendingTasks.join(', ')}
    Blockers: ${this.context.blockers.join(', ')}
    `;

    const prompt = `
    Analyze this MultiversX dApp project status and provide:
    
    ${projectStatus}
    
    Please provide:
    1. Project health metrics (progress %, velocity, quality score)
    2. Risk assessment with severity levels
    3. Prioritized recommendations for next actions
    4. Resource optimization suggestions
    5. Timeline adjustments if needed
    
    Focus on blockchain development best practices and delivery optimization.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 1500
      });

      return this.parseProjectAnalysis(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error analyzing project:', error);
      throw error;
    }
  }

  // Generate smart contract recommendations based on requirements
  async generateContractRecommendations(): Promise<{
    suggestedContracts: Array<{
      name: string;
      purpose: string;
      complexity: 'low' | 'medium' | 'high';
      estimatedCost: string;
      dependencies: string[];
      securityConsiderations: string[];
    }>;
    architecture: {
      pattern: string;
      rationale: string;
      benefits: string[];
      tradeoffs: string[];
    };
    gasOptimization: string[];
  }> {
    const prompt = `
    Based on this ${this.context.type} project requirements, recommend smart contract architecture:
    
    Project: ${this.context.name}
    Requirements: ${this.context.requirements.join(', ')}
    Complexity: ${this.context.complexity}
    
    Provide:
    1. Suggested smart contracts with purpose and complexity
    2. Overall architecture pattern recommendation
    3. Gas optimization strategies
    4. Security considerations
    5. Integration patterns for MultiversX blockchain
    
    Focus on efficiency, security, and maintainability.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1800
      });

      return this.parseContractRecommendations(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error generating contract recommendations:', error);
      throw error;
    }
  }

  // Analyze code quality and provide suggestions
  async analyzeCode(codeFiles: Array<{ path: string; content: string }>): Promise<CodeAnalysis> {
    const codeAnalysis = codeFiles.map(file => `
    File: ${file.path}
    Content Preview: ${file.content.substring(0, 500)}...
    `).join('\n');

    const prompt = `
    Analyze this MultiversX smart contract code for:
    
    ${codeAnalysis}
    
    Provide analysis on:
    1. Code complexity (1-10 scale)
    2. Maintainability score (1-10 scale)
    3. Security vulnerabilities
    4. Gas optimization opportunities
    5. Best practices compliance
    6. Technical debt indicators
    
    Focus on Rust smart contract patterns and MultiversX specific optimizations.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 1200
      });

      return this.parseCodeAnalysis(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw error;
    }
  }

  // Generate automated testing strategy
  async generateTestingStrategy(): Promise<{
    testTypes: Array<{
      type: string;
      description: string;
      tools: string[];
      coverage: string[];
    }>;
    testCases: Array<{
      scenario: string;
      priority: 'high' | 'medium' | 'low';
      steps: string[];
      expectedResults: string[];
    }>;
    automationScript: string;
  }> {
    const prompt = `
    Generate comprehensive testing strategy for ${this.context.type} MultiversX dApp:
    
    Project: ${this.context.name}
    Features: ${this.context.requirements.join(', ')}
    
    Include:
    1. Unit testing approach for smart contracts
    2. Integration testing scenarios
    3. End-to-end testing for user flows
    4. Security testing recommendations
    5. Performance testing guidelines
    6. Automated testing script structure
    
    Focus on MultiversX ecosystem testing tools and best practices.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 1600
      });

      return this.parseTestingStrategy(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error generating testing strategy:', error);
      throw error;
    }
  }

  // Update project context with new information
  updateContext(updates: Partial<ProjectContext>): void {
    this.context = { ...this.context, ...updates };
  }

  // Get project insights dashboard data
  async getInsights(): Promise<{
    summary: string;
    keyMetrics: Record<string, number | string>;
    trends: Array<{
      metric: string;
      trend: 'up' | 'down' | 'stable';
      change: number;
    }>;
    alerts: Array<{
      level: 'info' | 'warning' | 'error';
      message: string;
      action?: string;
    }>;
  }> {
    const completionRate = Math.round(
      (this.context.completedTasks.length / 
       (this.context.completedTasks.length + this.context.pendingTasks.length)) * 100
    );

    return {
      summary: `Project ${this.context.name} is ${completionRate}% complete with ${this.context.blockers.length} active blockers.`,
      keyMetrics: {
        completion: `${completionRate}%`,
        phase: this.context.currentPhase,
        tasks_completed: this.context.completedTasks.length,
        tasks_pending: this.context.pendingTasks.length,
        blockers: this.context.blockers.length
      },
      trends: [
        {
          metric: 'completion',
          trend: this.context.pendingTasks.length > this.context.completedTasks.length ? 'down' : 'up',
          change: completionRate
        }
      ],
      alerts: this.context.blockers.map(blocker => ({
        level: 'warning' as const,
        message: `Blocker identified: ${blocker}`,
        action: 'Review and resolve blocker'
      }))
    };
  }

  // Private parsing methods
  private parseRoadmapResponse(content: string): any {
    // Parse AI response into structured roadmap data
    // This would contain actual parsing logic
    return {
      phases: [],
      milestones: [],
      recommendations: []
    };
  }

  private parseProjectAnalysis(content: string): any {
    // Parse AI analysis response
    return {
      metrics: {
        progress: 0,
        velocity: 0,
        qualityScore: 0,
        riskLevel: 'medium' as const,
        estimatedCompletion: '',
        budgetUsage: 0
      },
      recommendations: [],
      nextActions: [],
      risks: []
    };
  }

  private parseContractRecommendations(content: string): any {
    // Parse contract recommendations
    return {
      suggestedContracts: [],
      architecture: {
        pattern: '',
        rationale: '',
        benefits: [],
        tradeoffs: []
      },
      gasOptimization: []
    };
  }

  private parseCodeAnalysis(content: string): CodeAnalysis {
    // Parse code analysis response
    return {
      complexity: 5,
      maintainability: 7,
      testCoverage: 0,
      securityIssues: [],
      suggestions: [],
      technicalDebt: []
    };
  }

  private parseTestingStrategy(content: string): any {
    // Parse testing strategy response
    return {
      testTypes: [],
      testCases: [],
      automationScript: ''
    };
  }
}