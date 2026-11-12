import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { parseJson } from './utils/parse-json';
import FeedbackMessage from '@/shared/FeedbackMessage';
import ActionButton from '@/shared/ActionButton';
import JsonTreeNode from './JsonTreeNode';

interface JsonTreeViewerProps {
  input: string;
}

function JsonTreeViewer({ input }: JsonTreeViewerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['root']),
  );

  let parsedValue: unknown;

  try {
    parsedValue = parseJson(input);
  } catch {
    if (!input.trim()) {
      return (
        <p className="text-xs text-text-muted">
          Enter JSON to explore its structure.
        </p>
      );
    }

    return (
      <FeedbackMessage variant="error">
        Invalid JSON. Please check your input.
      </FeedbackMessage>
    );
  }

  const toggleNode = (path: string) => {
    setExpandedNodes((previous) => {
      const next = new Set(previous);

      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }

      return next;
    });
  };

  const expandAll = () => {
    const paths = new Set<string>();

    const collectPaths = (value: unknown, path: string) => {
      if (Array.isArray(value)) {
        paths.add(path);

        value.forEach((item, index) => {
          collectPaths(item, `${path}.${index}`);
        });
      } else if (typeof value === 'object' && value !== null) {
        paths.add(path);

        Object.entries(value).forEach(([key, child]) => {
          collectPaths(child, `${path}.${key}`);
        });
      }
    };

    collectPaths(parsedValue, 'root');
    setExpandedNodes(paths);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ActionButton
          type="button"
          variant="ghost"
          icon={<ChevronDown size={14} />}
          onClick={expandAll}
        >
          Expand All
        </ActionButton>

        <ActionButton
          type="button"
          variant="ghost"
          icon={<ChevronRight size={14} />}
          onClick={collapseAll}
        >
          Collapse All
        </ActionButton>
      </div>

      <div className="overflow-auto rounded-md border border-border bg-surface p-3">
        <JsonTreeNode
          name="root"
          value={parsedValue}
          path="root"
          expanded={expandedNodes.has('root')}
          onToggle={() => toggleNode('root')}
          expandedNodes={expandedNodes}
          onNodeToggle={toggleNode}
        />
      </div>
    </div>
  );
}

export default JsonTreeViewer;
