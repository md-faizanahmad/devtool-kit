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
];

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

      <div className="mt-6 space-y-3">
        {tools.map(({ title, description, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className="group flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-surface"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-primary" />

              <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="mt-1 text-xs text-text-secondary">
                  {description}
                </p>
              </div>
            </div>

            <ArrowRight
              size={16}
              className="text-text-muted transition-transform group-hover:translate-x-1"
            />
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
