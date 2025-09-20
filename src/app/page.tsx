import Login from "@/components/Login";
import { Wallet, Zap, Shield, Code } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Supernova Forge
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Platformă avansată pentru dezvoltare dApp-uri MultiversX cu actualizări Supernova
          </p>
        </div>

        {/* Login Section */}
        <div className="max-w-md mx-auto mb-16">
          <Login />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Integrare Wallet
            </h3>
            <p className="text-gray-600">
              Conectare facilă prin xPortal, Extension sau WalletConnect pentru o experiență seamless
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Securitate Avansată
            </h3>
            <p className="text-gray-600">
              Protecție completă a tranzacțiilor și interacțiunilor cu smart contract-urile
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Development Tools
            </h3>
            <p className="text-gray-600">
              Suite completă de instrumente pentru dezvoltarea și testarea dApp-urilor MultiversX
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            © 2025 Supernova Forge - Dezvoltat de{" "}
            <a
              href="https://github.com/Gzeu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              George Pricop
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
