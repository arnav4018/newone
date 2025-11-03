import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';

export default function HomePage({
  provider,
  apiKey,
  inputCode,
  setInputCode,
  analysisResult,
  isLoading,
  error,
  handleAnalyze,
  isDefaultKey,
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analyze Your Code for Sustainable Impact</h1>
          <p className="text-gray-400">Optimize performance and reduce energy usage with AI-powered insights.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col bg-gray-800/70 border border-gray-700 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="codeInput" className="text-lg font-semibold">Input Code</label>
              <span className="text-xs text-gray-400">Provider: {provider}{isDefaultKey ? ' (default)' : (apiKey ? ' (key set)' : ' (no key)')}</span>
            </div>
            <textarea
              id="codeInput"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className="flex-1 min-h-[320px] bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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

          <div className="flex flex-col bg-gray-800/70 border border-gray-700 rounded-xl p-4 md:p-6 shadow-sm">
            <label className="text-lg font-semibold mb-3">Analysis Result</label>
            <div className="flex-1 min-h-[320px] bg-gray-900/40 border border-gray-700 rounded-lg px-4 py-3 overflow-auto">
              {error && (
                <div className="text-red-400 bg-red-900/20 border border-red-500 rounded-lg p-4">
                  <strong>Error:</strong> {error}
                </div>
              )}
              {!error && !analysisResult && !isLoading && (
                <p className="text-gray-500 text-center mt-8">Your analysis results will appear here...</p>
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
