export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const message = form.get('message');
    if (message) alert('Thanks! This demo does not send emails.');
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 space-y-3">
          <p className="text-gray-300">Developed by Your Name</p>
          <p className="text-gray-300">Email: your@email.com</p>
          <p className="text-gray-300">
            GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">@yourusername</a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 space-y-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            className="w-full min-h-[140px] bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg">Send</button>
        </form>
      </div>
    </div>
  );
}
