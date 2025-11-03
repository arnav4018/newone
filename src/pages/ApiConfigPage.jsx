import { useState } from 'react';

export default function ApiConfigPage({ provider, setProvider, apiKey, setApiKey, isDefaultKey }) {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('gc_provider', provider);
      localStorage.setItem('gc_apiKey', apiKey);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">API Configuration</h1>
        <form onSubmit={handleSave} className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 space-y-5">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium mb-2">AI Provider</label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="OpenAI">OpenAI</option>
              <option value="Gemini">Gemini (Google)</option>
              <option value="Grok (Mock)">Grok (Mock)</option>
              <option value="Llama (Mock)">Llama (Mock)</option>
            </select>
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-2">API Key</label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-400 mt-2">Stored securely in your browser's local storage. {isDefaultKey && provider === 'Gemini' && (<span className="text-emerald-400">Using default Gemini key</span>)}.</p>
          </div>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg"
          >
            Save
          </button>

          {saved && <p className="text-emerald-400 text-sm">Saved!</p>}
        </form>
      </div>
    </div>
  );
}
