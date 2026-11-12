import { parseJson } from './utils/parse-json';
import FeedbackMessage from '@/shared/FeedbackMessage';
import JsonTreeNode from './JsonTreeNode';

interface JsonTreeViewerProps {
  input: string;
}

function JsonTreeViewer({ input }: JsonTreeViewerProps) {
  let parsedValue: unknown;

  try {
    parsedValue = parseJson(input);
  } catch {
    parsedValue = undefined;
  }

  if (!input.trim()) {
    return (
      <p className="text-xs text-text-muted">
        Enter JSON to explore its structure.
      </p>
    );
  }

  if (parsedValue === undefined) {
    return (
      <FeedbackMessage variant="error">
        Invalid JSON. Please check your input.
      </FeedbackMessage>
    );
  }

  return (
    <div className="overflow-auto rounded-md border border-border bg-surface p-3">
      <JsonTreeNode name="root" value={parsedValue} />
    </div>
  );
}

export default JsonTreeViewer;
