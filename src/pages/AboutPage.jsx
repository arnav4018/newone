export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        <h1 className="text-3xl font-bold mb-4">About GreenCode Advisor</h1>
        <p className="text-gray-300 leading-7">
          Inefficient code consumes unnecessary CPU cycles, memory, and I/O, which translates directly into higher
          energy usage and carbon footprint. At scale, small inefficiencies compound into significant environmental
          impact.
        </p>
        <p className="text-gray-300 leading-7">
          GreenCode Advisor uses AI-powered analysis to identify hotspots in your code and suggest more sustainable
          alternatives. You get clear explanations, practical refactors, and actionable guidance to write greener code.
        </p>
        <p className="text-gray-300 leading-7">
          Our mission is to empower developers to make sustainability a default consideration in software design and
          implementation—without sacrificing performance or developer experience.
        </p>
        <p className="text-gray-400 leading-7">
          This project was created in a hackathon setting to showcase how developer tools can contribute to climate-aware
          engineering.
        </p>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold mb-2">Why add Gemini?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Fast, cost-efficient models (e.g., 1.5 Flash) are great for iterative code analysis workflows.</li>
            <li>Strong multimodal/text reasoning with competitive quality for optimization suggestions.</li>
            <li>Simple, browser-friendly REST API with API key auth; easy to integrate and cache.</li>
            <li>Diversity of providers reduces vendor lock-in and lets you pick greener infra/regions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
