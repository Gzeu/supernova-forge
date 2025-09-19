'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WalletButton } from '@/components/wallet/WalletButton';
import {
  Book,
  Code,
  Terminal,
  Zap,
  Shield,
  ExternalLink,
  Play,
  Download,
  FileText,
  Video,
} from 'lucide-react';

const docSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of SupernovaForge and MultiversX development',
    icon: Play,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    guides: [
      { title: 'Quick Start Guide', duration: '5 min read', difficulty: 'Beginner' },
      { title: 'Setting Up Your Environment', duration: '10 min read', difficulty: 'Beginner' },
      { title: 'Your First Smart Contract', duration: '15 min read', difficulty: 'Intermediate' },
      { title: 'Deploying to MultiversX', duration: '8 min read', difficulty: 'Beginner' },
    ],
  },
  {
    title: 'Smart Contract Development',
    description: 'Master smart contract development with Rust and MultiversX',
    icon: Code,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    guides: [
      { title: 'Rust Smart Contracts Basics', duration: '20 min read', difficulty: 'Intermediate' },
      { title: 'DeFi Protocol Development', duration: '45 min read', difficulty: 'Advanced' },
      { title: 'NFT Contract Patterns', duration: '25 min read', difficulty: 'Intermediate' },
      { title: 'DAO Governance Implementation', duration: '35 min read', difficulty: 'Advanced' },
    ],
  },
  {
    title: 'Supernova Updates',
    description: 'Latest features and improvements in MultiversX Supernova',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    guides: [
      { title: 'What\'s New in Supernova', duration: '12 min read', difficulty: 'Beginner' },
      { title: 'Enhanced Transaction Formats', duration: '18 min read', difficulty: 'Intermediate' },
      { title: 'Improved Wallet Integration', duration: '15 min read', difficulty: 'Intermediate' },
      { title: 'Migration Guide', duration: '30 min read', difficulty: 'Advanced' },
    ],
  },
  {
    title: 'Security Best Practices',
    description: 'Keep your smart contracts secure and audited',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    guides: [
      { title: 'Smart Contract Security', duration: '25 min read', difficulty: 'Advanced' },
      { title: 'Common Vulnerabilities', duration: '20 min read', difficulty: 'Intermediate' },
      { title: 'Audit Checklist', duration: '15 min read', difficulty: 'Advanced' },
      { title: 'Testing Strategies', duration: '30 min read', difficulty: 'Advanced' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold">SupernovaForge</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-primary">Home</a>
            <a href="/templates" className="transition-colors hover:text-primary">Templates</a>
            <a href="/deploy" className="transition-colors hover:text-primary">Deploy</a>
            <a href="/analytics" className="transition-colors hover:text-primary">Analytics</a>
            <a href="/docs" className="text-primary">Docs</a>
          </nav>
          
          <WalletButton />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              SupernovaForge Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides, tutorials, and references for building next-generation 
              dApps on MultiversX with Supernova updates
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="multiversx">
              <Terminal className="w-4 h-4 mr-2" />
              Quick Start
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download SDK
            </Button>
            <Button variant="outline">
              <Video className="w-4 h-4 mr-2" />
              Video Tutorials
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              API Reference
            </Button>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {docSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {section.title}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.guides.map((guide, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{guide.title}</p>
                              <p className="text-xs text-muted-foreground">{guide.duration}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {guide.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Community & Support */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Community & Support</CardTitle>
              <CardDescription>
                Join our community of developers building the future of decentralized applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Book className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive guides and API references
                  </p>
                  <Button size="sm" variant="outline">
                    Browse Docs
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Terminal className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute to the platform and report issues
                  </p>
                  <Button size="sm" variant="outline">
                    View Repository
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Discord</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with developers and get real-time support
                  </p>
                  <Button size="sm" variant="outline">
                    Join Discord
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}