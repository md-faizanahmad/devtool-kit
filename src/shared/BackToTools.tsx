import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

function BackToTools() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary transition-colors hover:text-primary"
    >
      <ArrowLeft size={14} />
      Back to tools
    </Link>
  );
}

export default BackToTools;
