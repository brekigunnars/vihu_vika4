export function unique<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const out: T[] = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}

export function flatten(arr: unknown[]): unknown[] {
  const out: unknown[] = [];

  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      for (const v of value) visit(v);
    } else {
      out.push(value);
    }
  };

  visit(arr);
  return out;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("chunk size must be a positive integer");
  }

  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}
