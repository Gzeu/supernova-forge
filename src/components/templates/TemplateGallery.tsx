'use client';

import React, { useState, useMemo } from 'react';
import { TemplateCard } from './TemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ContractTemplate } from '@/types/multiversx';
import { Search, Filter, Grid, List } from 'lucide-react';

// Mock templates data
const mockTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: 'AMM DEX Protocol',
    description: 'Automated Market Maker with liquidity pools and swap functionality. Includes fee collection and LP rewards.',
    category: 'DeFi',
    difficulty: 'Advanced',
    sourceCode: 'rust_amm_contract_code',
    abi: [],
    deploymentScript: 'deploy_amm.js',
    testSuite: 'amm_tests.rs',
    documentation: 'amm_docs.md',
    tags: ['AMM', 'DEX', 'Liquidity', 'Swap', 'DeFi'],
    estimatedGas: 85000000,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    name: 'NFT Collection',
    description: 'Standard NFT collection with minting, metadata, and royalty features.',
    category: 'NFT',
    difficulty: 'Beginner',
    sourceCode: 'rust_nft_contract_code',
    abi: [],
    deploymentScript: 'deploy_nft.js',
    testSuite: 'nft_tests.rs',
    documentation: 'nft_docs.md',
    tags: ['NFT', 'ERC721', 'Metadata', 'Royalties'],
    estimatedGas: 45000000,
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    name: 'Staking Protocol',
    description: 'Token staking with customizable reward rates and lock periods.',
    category: 'DeFi',
    difficulty: 'Intermediate',
    sourceCode: 'rust_staking_contract_code',
    abi: [],
    deploymentScript: 'deploy_staking.js',
    testSuite: 'staking_tests.rs',
    documentation: 'staking_docs.md',
    tags: ['Staking', 'Rewards', 'Lock', 'APY'],
    estimatedGas: 60000000,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 12 * 60 * 60 * 1000,
  },
  {
    id: '4',
    name: 'DAO Governance',
    description: 'Decentralized governance with proposal creation, voting, and execution.',
    category: 'DAO',
    difficulty: 'Advanced',
    sourceCode: 'rust_dao_contract_code',
    abi: [],
    deploymentScript: 'deploy_dao.js',
    testSuite: 'dao_tests.rs',
    documentation: 'dao_docs.md',
    tags: ['DAO', 'Governance', 'Voting', 'Proposals'],
    estimatedGas: 75000000,
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 6 * 60 * 60 * 1000,
  },
  {
    id: '5',
    name: 'Gaming Assets',
    description: 'In-game asset management with trading and upgrade mechanics.',
    category: 'Gaming',
    difficulty: 'Intermediate',
    sourceCode: 'rust_gaming_contract_code',
    abi: [],
    deploymentScript: 'deploy_gaming.js',
    testSuite: 'gaming_tests.rs',
    documentation: 'gaming_docs.md',
    tags: ['Gaming', 'Assets', 'Trading', 'Upgrades'],
    estimatedGas: 50000000,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 60 * 60 * 1000,
  },
  {
    id: '6',
    name: 'NFT Marketplace',
    description: 'Full-featured marketplace for buying, selling, and auctioning NFTs.',
    category: 'NFT',
    difficulty: 'Advanced',
    sourceCode: 'rust_marketplace_contract_code',
    abi: [],
    deploymentScript: 'deploy_marketplace.js',
    testSuite: 'marketplace_tests.rs',
    documentation: 'marketplace_docs.md',
    tags: ['Marketplace', 'Auction', 'Trading', 'Royalties'],
    estimatedGas: 90000000,
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 18 * 60 * 60 * 1000,
  },
];

interface TemplateGalleryProps {
  onSelectTemplate?: (template: ContractTemplate) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter((template) => {
      const matchesSearch = 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'all' || template.difficulty === difficultyFilter;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  const handleDeploy = (template: ContractTemplate) => {
    onSelectTemplate?.(template);
  };

  const handlePreview = (template: ContractTemplate) => {
    // Open template preview modal
    console.log('Preview template:', template);
  };

  const handleFork = (template: ContractTemplate) => {
    // Fork template to user's workspace
    console.log('Fork template:', template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Smart Contract Templates</h2>
          <p className="text-muted-foreground">
            Choose from our collection of battle-tested smart contract templates
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="DeFi">DeFi</SelectItem>
            <SelectItem value="NFT">NFT</SelectItem>
            <SelectItem value="Gaming">Gaming</SelectItem>
            <SelectItem value="DAO">DAO</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {/* Templates Grid/List */}
      <div className={viewMode === 'grid' ? 
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
        'space-y-4'
      }>
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onDeploy={handleDeploy}
            onPreview={handlePreview}
            onFork={handleFork}
          />
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setDifficultyFilter('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}