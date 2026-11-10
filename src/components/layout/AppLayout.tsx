interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-5 text-foreground">
      <header className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="DevTool-Kit"
            className="size-9 object-contain"
          />

          <div>
            <h1 className="text-sm font-semibold">DevTool-Kit</h1>
            <p className="text-xs text-text-secondary">Developer utilities</p>
          </div>
        </div>

        <span className="text-xs text-text-muted">v1.0.0</span>
      </header>

      <section className="py-6">{children}</section>

      <footer className="border-t border-border pt-4">
        <p className="text-xs text-text-muted">Built for developers</p>
      </footer>
    </main>
  );
}

export default AppLayout;
