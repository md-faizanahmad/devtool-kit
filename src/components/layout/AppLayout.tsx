import { useAppStore } from '@/stores/app.store';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const theme = useAppStore((state) => state.settings.theme);
  const updateSettings = useAppStore((state) => state.updateSettings);

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

        <select
          aria-label="Select theme"
          value={theme}
          onChange={(event) => {
            void updateSettings({
              theme: event.target.value as typeof theme,
            });
          }}
          className="rounded-sm border border-border bg-input px-2 py-1 text-xs"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </header>

      <section className="py-6">{children}</section>

      <footer className="border-t border-border pt-4">
        <p className="text-xs text-text-muted">Built for developers</p>
      </footer>
    </main>
  );
}

export default AppLayout;
