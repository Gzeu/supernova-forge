import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Code, Zap } from 'lucide-react';

// Define Users interface if it's being used
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Mock users data if needed
const Users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
];

const DocsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">📚 SupernovaForge Documentation</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Complete guide to building MultiversX dApps with SupernovaForge
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">MultiversX</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Getting Started
              </CardTitle>
              <CardDescription>
                Learn the basics and set up your first MultiversX dApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Installation & Setup</li>
                <li>• Project Structure</li>
                <li>• Environment Configuration</li>
                <li>• First Smart Contract</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Read More <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Reference
              </CardTitle>
              <CardDescription>
                Complete API documentation for all components and hooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Wallet Integration</li>
                <li>• Transaction Handling</li>
                <li>• Smart Contract Interaction</li>
                <li>• UI Components</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View API <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Examples
              </CardTitle>
              <CardDescription>
                Real-world examples and code snippets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• DeFi Applications</li>
                <li>• NFT Marketplaces</li>
                <li>• DAO Governance</li>
                <li>• Gaming dApps</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View Examples <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">🚀 Quick Start Guide</h2>
          <Card>
            <CardHeader>
              <CardTitle>Build Your First MultiversX dApp</CardTitle>
              <CardDescription>
                Follow this step-by-step guide to create your first decentralized application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">1. Setup Environment</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure your development environment with the necessary tools and dependencies.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Create Smart Contract</h4>
                  <p className="text-sm text-muted-foreground">
                    Write and deploy your first smart contract to the MultiversX network.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Build Frontend</h4>
                  <p className="text-sm text-muted-foreground">
                    Create a React frontend that interacts with your smart contract.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">4. Deploy & Test</h4>
                  <p className="text-sm text-muted-foreground">
                    Deploy your dApp to Vercel and test all functionality end-to-end.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users section - example usage */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">👥 Community Contributors</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Users.map((user) => (
              <Card key={user.id}>
                <CardContent className="flex items-center space-x-4 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
