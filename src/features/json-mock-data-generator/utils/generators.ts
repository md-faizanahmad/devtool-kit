import type { MockFieldType } from '../mock-data.types';

const FIRST_NAMES = [
  'John',
  'Jane',
  'Michael',
  'Sarah',
  'David',
  'Emily',
  'Robert',
  'Olivia',
  'Daniel',
  'Sophia',
];

const LAST_NAMES = [
  'Smith',
  'Johnson',
  'Brown',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
];

const CITIES = [
  'New York',
  'London',
  'Toronto',
  'Mumbai',
  'Sydney',
  'Berlin',
  'Tokyo',
  'Paris',
];

const randomItem = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const randomNumber = (min = 1, max = 1000): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateString = (): string => {
  const firstName = randomItem(FIRST_NAMES);
  const lastName = randomItem(LAST_NAMES);

  return `${firstName} ${lastName}`;
};

export const generateNumber = (): number => randomNumber();

export const generateBoolean = (): boolean => Math.random() >= 0.5;

export const generateEmail = (): string => {
  const firstName = randomItem(FIRST_NAMES).toLowerCase();
  const lastName = randomItem(LAST_NAMES).toLowerCase();

  return `${firstName}.${lastName}${randomNumber(1, 999)}@example.com`;
};

export const generateUUID = (): string => crypto.randomUUID();

export const generateDate = (): string =>
  new Date(
    Date.now() - randomNumber(0, 365 * 24 * 60 * 60 * 1000),
  ).toISOString();

export const generateCity = (): string => randomItem(CITIES);

export const generateAddress = () => ({
  street: `${randomNumber(1, 999)} ${randomItem(LAST_NAMES)} Street`,
  city: generateCity(),
  state: randomItem(['California', 'Texas', 'London', 'Maharashtra']),
  postalCode: String(randomNumber(10000, 99999)),
  country: randomItem(['USA', 'UK', 'Canada', 'India', 'Australia']),
});

export const generateProduct = () => ({
  id: generateUUID(),
  name: `${randomItem(['Premium', 'Classic', 'Modern', 'Smart'])} ${randomItem([
    'Laptop',
    'Phone',
    'Headphones',
    'Keyboard',
    'Monitor',
  ])}`,
  price: Number((Math.random() * 1000 + 10).toFixed(2)),
  inStock: generateBoolean(),
  category: randomItem(['Electronics', 'Accessories', 'Computers', 'Audio']),
});

export const generateUser = () => {
  const name = generateString();

  return {
    id: generateUUID(),
    name,
    email: generateEmail(),
    age: randomNumber(18, 65),
    isActive: generateBoolean(),
    address: generateAddress(),
    createdAt: generateDate(),
  };
};

export const generateFieldValue = (type: MockFieldType): unknown => {
  const generators: Record<MockFieldType, () => unknown> = {
    string: generateString,
    number: generateNumber,
    boolean: generateBoolean,
    email: generateEmail,
    uuid: generateUUID,
    date: generateDate,
  };

  return generators[type]();
};
