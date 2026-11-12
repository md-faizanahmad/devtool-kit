import { ChevronDown, ChevronRight } from 'lucide-react';

interface JsonTreeNodeProps {
  name: string;
  value: unknown;
  depth?: number;
  expanded: boolean;
  onToggle: () => void;
  expandedNodes: Set<string>;
  onNodeToggle: (path: string) => void;
  path: string;
}

function JsonTreeNode({
  name,
  value,
  depth = 0,
  expanded,
  onToggle,
  expandedNodes,
  onNodeToggle,
  path,
}: JsonTreeNodeProps) {
  const isArray = Array.isArray(value);
  const isObject = typeof value === 'object' && value !== null && !isArray;

  const isExpandable = isArray || isObject;

  const entries = isArray
    ? value.map((item, index) => [String(index), item] as const)
    : isObject
      ? Object.entries(value)
      : [];

  const getValueColor = () => {
    if (value === null) return 'text-text-muted';
    if (typeof value === 'string') return 'text-green-700';
    if (typeof value === 'number') return 'text-blue-700';
    if (typeof value === 'boolean') return 'text-orange-700';

    return 'text-text-primary';
  };

  const preview = isArray
    ? `Array(${value.length})`
    : isObject
      ? `Object(${entries.length})`
      : JSON.stringify(value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' && !expanded) {
      event.preventDefault();
      onToggle();
    }

    if (event.key === 'ArrowLeft' && expanded) {
      event.preventDefault();
      onToggle();
    }
  };
  return (
    <div>
      <div
        className="flex min-h-7 items-center gap-1 text-xs"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {isExpandable ? (
          <button
            type="button"
            onKeyDown={handleKeyDown}
            onClick={onToggle}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${name}`}
            aria-expanded={expanded}
            className="flex size-5 shrink-0 items-center justify-center text-text-muted hover:text-foreground"
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-5 shrink-0" />
        )}

        <span className="font-medium text-text-primary">{name}</span>

        <span className="text-text-muted">:</span>

        <span className={getValueColor()}>{preview}</span>
      </div>

      {isExpandable && expanded && (
        <div>
          {entries.map(([key, childValue]) => {
            const childPath = JSON.stringify([...JSON.parse(path), key]);

            return (
              <JsonTreeNode
                key={childPath}
                name={isArray ? `[${key}]` : key}
                value={childValue}
                depth={depth + 1}
                path={childPath}
                expanded={expandedNodes.has(childPath)}

                onToggle={() => onNodeToggle(childPath)}
                expandedNodes={expandedNodes}
                onNodeToggle={onNodeToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JsonTreeNode;
