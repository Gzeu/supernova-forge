'use client';

import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { WalletProvider } from '@/contexts/WalletContext';
import { ContractTemplate } from '@/types/multiversx';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const router = useRouter();
  
  const handleSelectTemplate = (template: ContractTemplate) => {
    // Navigate to deployment page with selected template
    router.push(`/deploy?template=${template.id}`);
  };
  
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        {/* Navigation */}
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold">SupernovaForge</span>
            </div>
            
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="/" className="transition-colors hover:text-primary">
                Home
              </a>
              <a href="/templates" className="text-primary">
                Templates
              </a>
              <a href="/deploy" className="transition-colors hover:text-primary">
                Deploy
              </a>
              <a href="/docs" className="transition-colors hover:text-primary">
                Docs
              </a>
            </nav>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </main>
      </div>
    </WalletProvider>
  );
}