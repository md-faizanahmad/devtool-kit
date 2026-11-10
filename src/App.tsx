function App() {
  return (
    <main className="min-h-screen bg-background m-10 px-5 py-5 text-foreground">
      {/* Header */}

      <header className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="DevTool-Kit logo"
            className="size-9 rounded-md object-contain"
          />

          <div>
            <h1 className="text-sm font-semibold tracking-tight">
              DevTool-Kit
            </h1>
            <p className="mt-0.5 text-xs text-text-secondary">
              Developer utilities
            </p>
          </div>
        </div>

        <span className="text-xs text-text-muted">v1.0.0</span>
      </header>

      {/* Welcome */}
      <section className="py-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Developer workspace
        </span>

        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
          Your tools.
          <br />
          One workspace.
        </h2>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          A simple collection of utilities designed to make everyday development
          faster and easier.
        </p>
      </section>

      {/* Workspace Status */}
      <section className="border-y border-border py-5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />

          <h3 className="text-sm font-medium">Workspace ready</h3>
        </div>

        <p className="mt-2 text-xs leading-5 text-text-secondary">
          Your developer toolkit is successfully installed and running.
        </p>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between pt-5">
        <span className="text-xs text-text-muted">Built for developers</span>

        <span className="text-xs font-medium text-primary">DevTool-Kit</span>
      </footer>
    </main>
  );
}

export default App;
