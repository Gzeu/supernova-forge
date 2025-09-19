'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletProvider } from '@/contexts/WalletContext';
import { WalletButton } from '@/components/wallet/WalletButton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Rocket,
  Code,
  Activity,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// Mock analytics data
const deploymentData = [
  { name: 'DeFi', deployments: 45, color: '#8884d8' },
  { name: 'NFT', deployments: 38, color: '#82ca9d' },
  { name: 'Gaming', deployments: 22, color: '#ffc658' },
  { name: 'DAO', deployments: 15, color: '#ff7300' },
];

const monthlyData = [
  { month: 'Jun', contracts: 12, users: 45 },
  { month: 'Jul', contracts: 25, users: 78 },
  { month: 'Aug', contracts: 38, users: 125 },
  { month: 'Sep', contracts: 52, users: 189 },
];

const networkUsage = [
  { network: 'Devnet', percentage: 65, color: '#3b82f6' },
  { network: 'Testnet', percentage: 25, color: '#10b981' },
  { network: 'Mainnet', percentage: 10, color: '#f59e0b' },
];

const stats = [
  {
    title: 'Total Deployments',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: Rocket,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Active Developers',
    value: '342',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Smart Contracts',
    value: '89',
    change: '+2.1%',
    trend: 'up',
    icon: Code,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Total Gas Used',
    value: '2.4B',
    change: '-1.3%',
    trend: 'down',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

export default function AnalyticsPage() {
  return (
    <WalletProvider>
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
              <a href="/analytics" className="text-primary">Analytics</a>
              <a href="/docs" className="transition-colors hover:text-primary">Docs</a>
            </nav>
            
            <WalletButton />
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
              <p className="text-muted-foreground">
                Real-time insights into SupernovaForge platform usage and performance
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-full ${stat.bgColor}`}>
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {stat.change}
                        </span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Deployment by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Deployments by Category</CardTitle>
                  <CardDescription>Smart contract deployments by template category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={deploymentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="deployments" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Network Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Usage</CardTitle>
                  <CardDescription>Distribution across MultiversX networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={networkUsage}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="percentage"
                        label={({ network, percentage }) => `${network}: ${percentage}%`}
                      >
                        {networkUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Growth Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Monthly growth in contracts deployed and active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="contracts"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Latest deployments and user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: 'deployment',
                      title: 'AMM DEX Protocol deployed',
                      user: 'developer1.elrond',
                      network: 'Devnet',
                      time: '2 minutes ago',
                      status: 'success',
                    },
                    {
                      id: 2,
                      type: 'deployment',
                      title: 'NFT Collection created',
                      user: 'artist.elrond',
                      network: 'Mainnet',
                      time: '15 minutes ago',
                      status: 'success',
                    },
                    {
                      id: 3,
                      type: 'deployment',
                      title: 'Staking Protocol deployment',
                      user: 'defi_builder.elrond',
                      network: 'Testnet',
                      time: '1 hour ago',
                      status: 'pending',
                    },
                    {
                      id: 4,
                      type: 'deployment',
                      title: 'DAO Governance deployed',
                      user: 'dao_creator.elrond',
                      network: 'Devnet',
                      time: '2 hours ago',
                      status: 'success',
                    },
                  ].map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'pending' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          <Rocket className={`h-4 w-4 ${
                            activity.status === 'success' ? 'text-green-600' :
                            activity.status === 'pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            by {activity.user} on {activity.network}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={activity.status === 'success' ? 'success' : 'warning'}>
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </WalletProvider>
  );
}