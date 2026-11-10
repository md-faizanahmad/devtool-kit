import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold tracking-tight">
        Your tools.
        <br />
        One workspace.
      </h2>

      <p className="mt-3 text-sm leading-6 text-text-secondary">
        A simple collection of utilities designed to make everyday development
        faster and easier.
      </p>

      <div className="mt-6 border-y border-border py-5">
        <p className="text-sm font-medium">Workspace ready</p>
        <p className="mt-2 text-xs text-text-secondary">
          Your developer toolkit is successfully installed and running.
        </p>
      </div>
    </AppLayout>
  );
}

export default App;
