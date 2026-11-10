import AppLayout from './AppLayout';

export default function HomePage() {
  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold">
        Your tools.
        <br />
        One workspace.
      </h2>

      <p className="mt-3 text-sm leading-6 text-text-secondary">
        Your everyday developer utilities in one place.
      </p>
    </AppLayout>
  );
}
