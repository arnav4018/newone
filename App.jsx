import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';
import { getAnalysis } from './apiService';

function App() {
  const [provider, setProvider] = useState('OpenAI');
  // Use environment variable as fallback if available
  const [apiKey, setApiKey] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to analyze.');
      return;
    }

    // Use environment variable as fallback for API key
    let effectiveApiKey = apiKey.trim();
    if (!effectiveApiKey) {
      if (provider === 'OpenAI') {
        effectiveApiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
      } else if (provider === 'Gemini') {
        effectiveApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      }
    }

    if (!effectiveApiKey && (provider === 'OpenAI' || provider === 'Gemini')) {
      setError(`Please enter your ${provider} API key or set it in environment variables.`);
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const result = await getAnalysis(inputCode, provider, effectiveApiKey);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">♻️ GreenCode Advisor</h1>
          <p className="text-gray-400">
            Analyze your code for energy efficiency and sustainability
          </p>
        </header>

        {/* API Controls */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="provider" className="block text-sm font-medium mb-2">
                AI Provider
              </label>
              <select
                id="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="OpenAI">OpenAI</option>
                <option value="Gemini">Gemini</option>
                <option value="Grok (Mock)">Grok (Mock)</option>
                <option value="Llama (Mock)">Llama (Mock)</option>
              </select>
            </div>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                API Key
                {(provider === 'OpenAI' && import.meta.env.VITE_OPENAI_API_KEY) || 
                 (provider === 'Gemini' && import.meta.env.VITE_GEMINI_API_KEY) ? (
                  <span className="ml-2 text-xs text-green-400">(using env variable)</span>
                ) : null}
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`${(provider === 'OpenAI' && import.meta.env.VITE_OPENAI_API_KEY) || 
                              (provider === 'Gemini' && import.meta.env.VITE_GEMINI_API_KEY) 
                              ? 'Optional - using env variable' : 'Enter your API key'}`}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="flex flex-col">
            <label htmlFor="codeInput" className="block text-lg font-semibold mb-2">
              Input Code
            </label>
            <textarea
              id="codeInput"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className="flex-1 min-h-[400px] bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </button>
          </div>

          {/* Right Column - Output */}
          <div className="flex flex-col">
            <label className="block text-lg font-semibold mb-2">
              Analysis Result
            </label>
            <div className="flex-1 min-h-[400px] bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 overflow-auto">
              {error && (
                <div className="text-red-400 bg-red-900/20 border border-red-500 rounded-lg p-4">
                  <strong>Error:</strong> {error}
                </div>
              )}
              {!error && !analysisResult && !isLoading && (
                <p className="text-gray-500 text-center mt-8">
                  Your analysis results will appear here...
                </p>
              )}
              {analysisResult && (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
