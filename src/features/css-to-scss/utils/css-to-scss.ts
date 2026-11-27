import postcss, {
  //   type AtRule,
  type Container,
  type Rule,
} from 'postcss';

const NESTABLE_AT_RULES = new Set(['media', 'supports', 'container', 'layer']);

const splitSelectors = (selector: string): string[] =>
  selector.split(',').map((item) => item.trim());

const isInsideAtRule = (rule: Rule): boolean => {
  let parent = rule.parent;

  while (parent && parent.type !== 'root') {
    if (parent.type === 'atrule') return true;
    parent = parent.parent;
  }

  return false;
};

const getNestedSelector = (
  parentSelectors: string[],
  childSelectors: string[],
): string[] | null => {
  const nestedSelectors: string[] = [];

  for (const child of childSelectors) {
    let matchedParent: string | undefined;

    for (const parent of parentSelectors) {
      if (
        child.startsWith(`${parent} `) ||
        child.startsWith(`${parent}:`) ||
        child.startsWith(`${parent}[`) ||
        child.startsWith(`${parent}::`) ||
        child === parent
      ) {
        matchedParent = parent;
        break;
      }
    }

    if (!matchedParent) return null;

    if (child === matchedParent) {
      return null;
    }

    nestedSelectors.push(`&${child.slice(matchedParent.length)}`);
  }

  return nestedSelectors;
};

const nestRules = (container: Container): void => {
  const rules = container.nodes?.filter(
    (node): node is Rule => node.type === 'rule',
  );

  if (!rules || rules.length < 2) return;

  for (const parentRule of rules) {
    const parentSelectors = splitSelectors(parentRule.selector);

    for (const childRule of [...rules]) {
      if (
        childRule === parentRule ||
        childRule.parent !== container ||
        isInsideAtRule(childRule)
      ) {
        continue;
      }

      const childSelectors = splitSelectors(childRule.selector);

      const nestedSelectors = getNestedSelector(
        parentSelectors,
        childSelectors,
      );

      if (!nestedSelectors) continue;

      childRule.selector = nestedSelectors.join(', ');
      parentRule.append(childRule);
    }

    parentRule.nodes?.forEach((node) => {
      if (node.type === 'rule' || node.type === 'atrule') {
        nestRules(node);
      }
    });
  }
};

const processAtRules = (container: Container): void => {
  container.nodes?.forEach((node) => {
    if (node.type !== 'atrule') return;

    if (NESTABLE_AT_RULES.has(node.name.toLowerCase())) {
      nestRules(node);
    }

    processAtRules(node);
  });
};

export const convertCssToScss = (css: string): string => {
  if (!css.trim()) {
    throw new Error('Please enter CSS code to convert.');
  }

  try {
    const root = postcss.parse(css);

    nestRules(root);
    processAtRules(root);

    return root.toResult({
      map: false,
      stringifier: undefined,
    }).css;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`CSS parsing failed: ${error.message}`, { cause: error });
    }

    throw new Error('Unable to convert CSS to SCSS.', { cause: error });
  }
};
