function App() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">DevTool-Kit</h1>

        <p className="mt-2 text-sm text-text-secondary">
          Developer Productivity Toolkit
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-sm  bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover">
            Get Started
          </button>

          <button className="rounded-sm bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary-hover">
            Explore Tools
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
