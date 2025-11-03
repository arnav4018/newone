/**
 * API Service for GreenCode Advisor
 * Handles API calls to different AI providers
 */

export async function getAnalysis(code, provider, apiKey) {
  switch (provider) {
    case 'OpenAI':
      return await getOpenAIAnalysis(code, apiKey);

    case 'Gemini':
      return await getGeminiAnalysis(code, apiKey);
    
    case 'Grok (Mock)':
      return await getGrokAnalysis(code);
    
    case 'Llama (Mock)':
      return await getLlamaAnalysis(code);
    
    default:
      throw new Error('Invalid AI provider selected.');
  }
}

async function getOpenAIAnalysis(code, apiKey) {
  if (!apiKey) {
    throw new Error('API key is required for OpenAI.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: "You are 'GreenCode Advisor', an expert assistant in sustainable software engineering. Analyze the following code snippet provided by the user. Your goals are to: 1. Identify any parts of the code that are computationally inefficient (e.g., bad loops, slow data structures, redundant operations). 2. Explain why this inefficiency wastes CPU cycles and, by extension, energy. 3. Provide a refactored, more energy-efficient code snippet. 4. Present your response in clean, easy-to-read markdown. Start with a 1-sentence summary of the main issue."
          },
          {
            role: 'user',
            content: code
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    if (String(error.message || '').toLowerCase().includes('fetch')) {
      throw new Error('Network error: Unable to connect to OpenAI API.');
    }
    throw error;
  }
}

async function getGeminiAnalysis(code, apiKey) {
  if (!apiKey) {
    throw new Error('API key is required for Gemini.');
  }

  const prompt =
    "You are 'GreenCode Advisor', an expert assistant in sustainable software engineering. Analyze the following code snippet. Goals: 1) Identify computational inefficiencies, 2) Explain the energy impact, 3) Provide a refactored, greener version, 4) Respond in clean markdown starting with a one-sentence summary.\n\nCode:\n" + code;

  async function tryOnce(ver, model) {
    const base = `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent`;
    const payload = {
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ]
    };

    // Try with header key first
    let res = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return text ? { ok: true, text } : { ok: false, error: 'Gemini API returned no content.' };
    }
    const err1 = await res.json().catch(() => ({}));

    // Fallback with query param key (some setups require it)
    res = await fetch(base + `?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return text ? { ok: true, text } : { ok: false, error: 'Gemini API returned no content.' };
    }
    const err2 = await res.json().catch(() => ({}));
    return { ok: false, error: err2.error?.message || err1.error?.message || `${ver}/${model} not available` };
  }

  async function listModels(ver) {
    // Try header-key then query-key
    let r = await fetch(`https://generativelanguage.googleapis.com/${ver}/models`, {
      headers: { 'x-goog-api-key': apiKey }
    });
    if (!r.ok) {
      r = await fetch(`https://generativelanguage.googleapis.com/${ver}/models?key=${encodeURIComponent(apiKey)}`);
    }
    if (!r.ok) return { ok: false, models: [], error: `${ver} list failed` };
    const data = await r.json().catch(() => ({}));
    return { ok: true, models: data.models || [] };
  }

  function pickModel(models) {
    // Normalize names and prefer flash 1.5, then pro 1.5, then any supporting generateContent
    const norm = models.map(m => ({
      name: (m.name || '').replace(/^models\//, ''),
      methods: m.supportedGenerationMethods || []
    }));
    const supports = (id) => norm.find(x => x.name.includes(id) && x.methods.includes('generateContent'))?.name;
    return (
      supports('gemini-1.5-flash') ||
      supports('gemini-1.5-pro') ||
      norm.find(x => x.methods.includes('generateContent'))?.name ||
      null
    );
  }

  const verOrder = ['v1', 'v1beta'];
  for (const ver of verOrder) {
    try {
      const lm = await listModels(ver);
      if (lm.ok && lm.models.length) {
        const chosen = pickModel(lm.models);
        if (chosen) {
          const attempt = await tryOnce(ver, chosen);
          if (attempt.ok) return attempt.text;
        }
      }
    } catch {}
  }

  // Fallback to a small set of known IDs across versions
  const candidates = [
    { ver: 'v1', model: 'gemini-1.5-flash-latest' },
    { ver: 'v1beta', model: 'gemini-1.5-flash' },
    { ver: 'v1', model: 'gemini-1.0-pro-latest' },
    { ver: 'v1beta', model: 'gemini-1.0-pro' },
  ];

  let lastError = '';
  for (const c of candidates) {
    try {
      const r = await tryOnce(c.ver, c.model);
      if (r.ok) return r.text;
      lastError = r.error;
    } catch (e) {
      lastError = e.message || String(e);
    }
  }

  // As a final hint, return available models list to the user for troubleshooting.
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`);
    const listData = await listRes.json().catch(() => ({}));
    const names = (listData.models || []).slice(0, 10).map(m => m.name).join(', ');
    throw new Error(`Gemini error: ${lastError || 'No supported model found.'}${names ? ` Available models: ${names}` : ''}`);
  } catch {
    throw new Error(`Gemini error: ${lastError || 'No supported model found.'}`);
  }
}

async function getGrokAnalysis(code) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return Promise.resolve(
    `## Grok Analysis (Mock)

This is a placeholder. The real Grok API would be called here.

### Code Snippet Analyzed:
\`\`\`
${code.slice(0, 100)}${code.length > 100 ? '...' : ''}
\`\`\`

**Note:** Integration with Grok API coming soon!`
  );
}

async function getLlamaAnalysis(code) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return Promise.resolve(
    `## Llama Analysis (Mock)

This is a placeholder. The real Llama API would be called here.

### Code Snippet Analyzed:
\`\`\`
${code.slice(0, 100)}${code.length > 100 ? '...' : ''}
\`\`\`

**Note:** Integration with Llama API coming soon!`
  );
}
