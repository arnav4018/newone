import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ApiConfigPage from './pages/ApiConfigPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { getAnalysis } from '../apiService.js';

const DEFAULT_GEMINI_KEY = 'AIzaSyBMIkFLLmZnXsGt4nCREm69fi4FYe611_0';

export default function App() {
  const [provider, setProvider] = useState(() => localStorage.getItem('gc_provider') || 'Gemini');
  const storedKey = localStorage.getItem('gc_apiKey');
  const [apiKey, setApiKey] = useState(() => storedKey || DEFAULT_GEMINI_KEY);
  const [inputCode, setInputCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isDefaultKey = useMemo(() => apiKey === DEFAULT_GEMINI_KEY && !storedKey, [apiKey, storedKey]);

  useEffect(() => {
    try { localStorage.setItem('gc_provider', provider); } catch {}
  }, [provider]);

  useEffect(() => {
    try { localStorage.setItem('gc_apiKey', apiKey); } catch {}
  }, [apiKey]);

  const handleAnalyze = async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to analyze.');
      return;
    }
    const requiresKey = ['OpenAI', 'Gemini'];
    if (!apiKey.trim() && requiresKey.includes(provider)) {
      setError('Please enter your API key.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const result = await getAnalysis(inputCode, provider, apiKey);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Navbar provider={provider} isDefaultKey={isDefaultKey} />
      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                provider={provider}
                apiKey={apiKey}
                inputCode={inputCode}
                setInputCode={setInputCode}
                analysisResult={analysisResult}
                isLoading={isLoading}
                error={error}
                handleAnalyze={handleAnalyze}
                isDefaultKey={isDefaultKey}
              />
            }
          />
          <Route
            path="/api"
            element={
              <ApiConfigPage
                provider={provider}
                setProvider={setProvider}
                apiKey={apiKey}
                setApiKey={setApiKey}
                isDefaultKey={isDefaultKey}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}
