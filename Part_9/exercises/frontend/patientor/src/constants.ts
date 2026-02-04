export const apiBaseUrl = 'http://localhost:3000/api';

export function assertNever(value: never): never {
  throw new Error(
    `Unhandled value type: ${JSON.stringify(value)}`
  );
}
