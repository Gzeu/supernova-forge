'use client';

import { useState } from 'react';
import { Github, ExternalLink, Zap, Code, Rocket, Shield } from 'lucide-react';

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold">SupernovaForge</span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/Gzeu/supernova-forge"
            target="_blank"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <button 
            onClick={() => setIsConnected(!isConnected)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isConnected 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Powered by MultiversX Supernova Updates
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Build the Future of
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Decentralized Apps
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            SupernovaForge este platforma dezvoltătorilor pentru creația de aplicații descentralizate de ultima generație pe MultiversX. 
            Template-uri complete, deployment automat și integrare Supernova.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
              Start Building
            </button>
            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-semibold transition-all">
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Tools for Modern dApp Development</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Code className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Contract Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bibliotecă completă de template-uri optimizate pentru DeFi, NFT, Gaming și DAO applications.
              </p>
            </div>
            
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Rocket className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">One-Click Deploy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Deploy direct pe MultiversX mainnet sau testnet cu un singur click. Vercel integration inclusă.
              </p>
            </div>
            
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Supernova Integration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ultimele update-uri Supernova integrate pentru performanță și securitate maximă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-600 rounded"></div>
              <span className="font-semibold">SupernovaForge</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://linear.app/gpz/project/fed0da9f-406b-4258-aa0b-4057c31f3be1" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center">
                Linear Project <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <a href="https://www.notion.so/273c2a544835812485f5cc38b6790c3a" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors flex items-center">
                Documentation <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>Built with ❤️ for the MultiversX ecosystem by George Pricop</p>
          </div>
        </div>
      </footer>
    </div>
  );
}