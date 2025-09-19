'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContractTemplate } from '@/types/multiversx';
import { Code, Download, Eye, Star, GitFork } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface TemplateCardProps {
  template: ContractTemplate;
  onDeploy?: (template: ContractTemplate) => void;
  onPreview?: (template: ContractTemplate) => void;
  onFork?: (template: ContractTemplate) => void;
}

const difficultyColors = {
  Beginner: 'success',
  Intermediate: 'warning',
  Advanced: 'destructive',
} as const;

const categoryColors = {
  DeFi: 'multiversx',
  NFT: 'info',
  Gaming: 'success',
  DAO: 'warning',
} as const;

export function TemplateCard({ template, onDeploy, onPreview, onFork }: TemplateCardProps) {
  const difficultyColor = difficultyColors[template.difficulty] || 'default';
  const categoryColor = categoryColors[template.category] || 'default';

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={categoryColor as any}>{template.category}</Badge>
              <Badge variant={difficultyColor as any} className="text-xs">
                {template.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {template.name}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3" />
            <span>0</span>
            <GitFork className="w-3 h-3 ml-2" />
            <span>0</span>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {template.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Code className="w-3 h-3 mr-1" />
                Gas: {template.estimatedGas.toLocaleString()}
              </span>
            </div>
            <span>{formatTimeAgo(new Date(template.updatedAt))}</span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2 pt-2">
            <Button
              size="sm"
              variant="default"
              className="flex-1"
              onClick={() => onDeploy?.(template)}
            >
              <Download className="w-4 h-4 mr-2" />
              Deploy
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview?.(template)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onFork?.(template)}
            >
              <GitFork className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}