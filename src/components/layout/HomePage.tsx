import { Link } from 'react-router';
import {
  Braces,
  ArrowRight,
  Binary,
  LinkIcon,
  Dices,
  CalendarClock,
  Palette,
  CaseSensitive,
  KeyRound,
  Regex,
  FileText,
  CodeXml,
  FileCode,
  Timer,
  FileCode2,
  Globe,
  Database,
  Code2,
  FileJson,
  BookOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AppLayout from './AppLayout';

interface Tool {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

const tools: Tool[] = [
  {
    title: 'JSON Formatter',
    description: 'Format, validate and minify JSON.',
    path: '/json-formatter',
    icon: Braces,
  },
  {
    title: 'Base64 Converter',
    description: 'Encode and decode Base64 text.',
    path: '/base64-converter',
    icon: Binary,
  },
  {
    title: 'URL Encoder',
    description: 'Encode and decode URL components.',
    path: '/url-encoder',
    icon: LinkIcon,
  },
  {
    title: 'UUID Generator',
    description: 'Generate unique UUID v4 identifiers.',
    path: '/uuid-generator',
    icon: Dices,
  },
  {
    title: 'Timestamp Converter',
    description: 'Convert Unix timestamps and dates.',
    path: '/timestamp-converter',
    icon: CalendarClock,
  },
  {
    title: 'Text Case Converter',
    description: 'Transform text into different casing formats.',
    path: '/text-case-converter',
    icon: CaseSensitive,
  },
  {
    title: 'Color Converter',
    description: 'Convert HEX colors to RGB and HSL.',
    path: '/color-converter',
    icon: Palette,
  },
  {
    title: 'Password Generator',
    description: 'Generate secure passwords with customizable options.',
    path: '/password-generator',
    icon: KeyRound,
  },
  {
    title: 'Regex Tester',
    description:
      'Test regular expressions and inspect matches and capture groups.',
    path: '/regex-tester',
    icon: Regex,
  },
  {
    title: 'Markdown Previewer',
    description: 'Write Markdown and preview formatted content instantly.',
    path: '/markdown-previewer',
    icon: FileText,
  },
  {
    title: 'HTML Formatter',
    description: 'Format, minify, and validate HTML markup.',
    path: '/html-formatter',
    icon: CodeXml,
  },
  {
    title: 'CSS Formatter',
    description: 'Format, minify, and validate CSS stylesheets.',
    path: '/css-formatter',
    icon: FileCode,
  },
  {
    title: 'JWT Decoder',
    description: 'Decode JWT headers, payloads, and inspect token claims.',
    path: '/jwt-decoder',
    icon: KeyRound,
  },
  {
    title: 'Cron Generator',
    description:
      'Generate and understand cron expressions for scheduled tasks.',
    path: '/cron-generator',
    icon: Timer,
  },
  {
    title: 'JSON to TypeScript',
    description: 'Convert JSON data into TypeScript interfaces and types.',
    path: '/json-to-typescript',
    icon: FileCode2,
  },
  {
    title: 'API Request Builder',
    description: 'Build HTTP requests and inspect API responses.',
    path: '/api-request-builder',
    icon: Globe,
  },
  {
    title: 'JSON Mock Data Generator',
    description:
      'Generate realistic mock users, products, addresses, and API responses.',
    path: '/json-mock-data-generator',
    icon: Code2,
  },
  {
    title: 'SQL Formatter',
    description:
      'Format, beautify, and minify SQL queries with customizable options.',
    path: 'sql-formatter',
    icon: Database,
  },
  {
    title: 'JSON Schema Generator',
    description: 'Generate JSON Schema automatically from JSON data.',
    path: '/json-schema-generator',
    icon: FileJson,
  },
  {
    title: 'OpenAPI Viewer',
    description:
      'Explore OpenAPI specifications, endpoints, parameters, and responses.',
    path: '/openapi-viewer',
    icon: BookOpen,
  },
  {
    title: 'CSS to SCSS Converter',
    description: 'Convert CSS into clean, nested SCSS syntax.',
    path: '/css-to-scss',
    icon: FileCode2,
  },
];

export default function HomePage() {
  return (
    <AppLayout>
      <div className="mx-auto w-full min-w-0 max-w-5xl">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Your tools.
            <br />
            One workspace.
          </h2>

          <p className="max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
            Your everyday developer utilities in one place.
          </p>
        </header>

        <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
          {tools.map(({ title, description, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="group flex min-w-0 items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-4 sm:p-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10">
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="wrap-break-word text-sm font-medium sm:text-base">
                  {title}
                </h3>

                <p className="mt-1 wrap-break-word text-xs leading-5 text-text-secondary sm:text-sm">
                  {description}
                </p>
              </div>

              <ArrowRight
                size={16}
                className="ml-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
