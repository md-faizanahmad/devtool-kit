export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const CHARACTERS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

/**
 * Generates a cryptographically secure random password.
 */
export const generatePassword = (options: PasswordOptions): string => {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = options;

  if (!Number.isInteger(length) || length < 1 || length > 128) {
    throw new Error('Password length must be between 1 and 128.');
  }

  const selectedGroups = [
    includeUppercase ? CHARACTERS.uppercase : '',
    includeLowercase ? CHARACTERS.lowercase : '',
    includeNumbers ? CHARACTERS.numbers : '',
    includeSymbols ? CHARACTERS.symbols : '',
  ].filter(Boolean);

  if (selectedGroups.length === 0) {
    throw new Error('Select at least one character type.');
  }

  if (length < selectedGroups.length) {
    throw new Error(
      'Password length must be at least the number of selected character types.',
    );
  }

  const characterPool = selectedGroups.join('');
  const passwordCharacters: string[] = [];

  // Ensure every selected character type appears at least once.
  for (const group of selectedGroups) {
    passwordCharacters.push(getSecureRandomCharacter(group));
  }

  // Fill the remaining password length.
  while (passwordCharacters.length < length) {
    passwordCharacters.push(getSecureRandomCharacter(characterPool));
  }

  // Securely shuffle the generated characters.
  return secureShuffle(passwordCharacters).join('');
};

/**
 * Selects a character using rejection sampling to avoid modulo bias.
 */
const getSecureRandomCharacter = (characters: string): string => {
  const maxValidValue = Math.floor(256 / characters.length) * characters.length;
  const randomValues = new Uint8Array(1);

  let randomValue: number;

  do {
    crypto.getRandomValues(randomValues);
    randomValue = randomValues[0];
  } while (randomValue >= maxValidValue);

  return characters[randomValue % characters.length];
};

/**
 * Shuffles characters using the Fisher-Yates algorithm.
 */
const secureShuffle = (characters: string[]): string[] => {
  const result = [...characters];
  const randomValues = new Uint32Array(1);

  for (let i = result.length - 1; i > 0; i--) {
    crypto.getRandomValues(randomValues);

    const j = randomValues[0] % (i + 1);

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
