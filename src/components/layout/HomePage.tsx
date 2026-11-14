import { Link } from 'react-router';
import { Braces, ArrowRight, Binary, LinkIcon } from 'lucide-react';
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

      <div className="mt-6">
        <Link
          to="/json-formatter"
          className="group flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-surface"
        >
          <div className="flex items-center gap-3">
            <Braces size={20} className="text-primary" />

            <div>
              <h3 className="text-sm font-medium">JSON Formatter</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Format, validate and minify JSON.
              </p>
            </div>
          </div>

          <ArrowRight
            size={16}
            className="text-text-muted transition-transform group-hover:translate-x-1"
          />
        </Link>
        <Link
          to="/base64-converter"
          className="group flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-surface"
        >
          <div className="flex items-center gap-3">
            <Binary size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-medium">Base64 Converter</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Encode and decode Base64 text.
              </p>
            </div>
          </div>

          <ArrowRight
            size={16}
            className="text-text-muted transition-transform group-hover:translate-x-1"
          />
        </Link>
        <Link
          to="/url-encoder"
          className="group flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-surface"
        >
          <div className="flex items-center gap-3">
            <LinkIcon size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-medium">URL Encoder</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Encode and decode URL components.
              </p>
            </div>
          </div>

          <ArrowRight
            size={16}
            className="text-text-muted transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </AppLayout>
  );
}
