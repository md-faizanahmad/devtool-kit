export interface RegexMatch {
  value: string;
  index: number;
  endIndex: number;
  groups: (string | undefined)[];
  namedGroups: Record<string, string> | undefined;
}

export interface RegexResult {
  matches: RegexMatch[];
  error: string | null;
}

export interface RegexOptions {
  pattern: string;
  flags: string;
  input: string;
}

const VALID_FLAGS = /^[dgimsuvy]*$/;

export const testRegex = ({
  pattern,
  flags,
  input,
}: RegexOptions): RegexResult => {
  if (!pattern) {
    return {
      matches: [],
      error: 'Enter a regular expression pattern.',
    };
  }

  if (!VALID_FLAGS.test(flags) || new Set(flags).size !== flags.length) {
    return {
      matches: [],
      error: 'Invalid or duplicate regular expression flags.',
    };
  }

  try {
    const regex = new RegExp(pattern, flags);

    if (!input) {
      return { matches: [], error: null };
    }

    const matches: RegexMatch[] = [];

    if (regex.global || regex.sticky) {
      let match: RegExpExecArray | null;

      while ((match = regex.exec(input)) !== null) {
        matches.push(createMatch(match));

        // Prevent infinite loops for zero-length matches.
        if (match[0].length === 0) {
          regex.lastIndex += 1;
        }
      }
    } else {
      const match = regex.exec(input);

      if (match) {
        matches.push(createMatch(match));
      }
    }

    return { matches, error: null };
  } catch (error) {
    return {
      matches: [],
      error:
        error instanceof Error ? error.message : 'Invalid regular expression.',
    };
  }
};

const createMatch = (match: RegExpExecArray): RegexMatch => ({
  value: match[0],
  index: match.index,
  endIndex: match.index + match[0].length,
  groups: match.slice(1),
  namedGroups: match.groups ? { ...match.groups } : undefined,
});
