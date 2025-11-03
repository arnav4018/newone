# ♻️ GreenCode Advisor

A production-ready React application that analyzes code for energy efficiency and sustainability using AI.

## Features

- **Dark Mode UI**: Clean, modern interface with dark theme
- **Multi-Provider Support**: Swappable AI providers (OpenAI, Grok, Llama)
- **Markdown Rendering**: Beautiful formatting of analysis results
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **TailwindCSS**: Utility-first CSS framework
- **react-markdown**: Markdown rendering
- **lucide-react**: Beautiful icon library

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Usage

1. **Select AI Provider**: Choose from OpenAI or mock providers (Grok, Llama)
2. **Enter API Key**: For OpenAI, provide your API key
3. **Paste Code**: Enter the code you want to analyze
4. **Analyze**: Click the "Analyze" button to get sustainability insights

## API Configuration

### OpenAI

To use OpenAI:
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Select "OpenAI" from the provider dropdown
3. Paste your API key in the API Key field

### Mock Providers

Grok and Llama are currently mock implementations that return placeholder responses. Replace the mock functions in `apiService.js` with actual API calls when ready.

## File Structure

```
.
├── App.jsx              # Main application component
├── apiService.js        # API service with swappable providers
├── main.jsx            # React entry point
├── index.html          # HTML template
├── index.css           # Global styles with Tailwind
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration
```

## Customization

### Adding New AI Providers

Edit `apiService.js` and add a new case to the switch statement:

```javascript
case 'NewProvider':
  return await getNewProviderAnalysis(code, apiKey);
```

### Styling

Modify Tailwind classes in `App.jsx` or extend the theme in `tailwind.config.js`.

## License

MIT
