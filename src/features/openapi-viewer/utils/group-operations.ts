import type { OpenApiOperation } from '../openapi-viewer.types';

export interface OpenApiTagGroup {
  tag: string;
  operations: OpenApiOperation[];
}

export const groupOperationsByTag = (
  operations: OpenApiOperation[],
): OpenApiTagGroup[] => {
  const groups = new Map<string, OpenApiOperation[]>();

  operations.forEach((operation) => {
    const tags = operation.tags?.length ? operation.tags : ['Untagged'];

    tags.forEach((tag) => {
      const existing = groups.get(tag) ?? [];
      existing.push(operation);
      groups.set(tag, existing);
    });
  });

  return Array.from(groups, ([tag, groupedOperations]) => ({
    tag,
    operations: groupedOperations,
  }));
};
