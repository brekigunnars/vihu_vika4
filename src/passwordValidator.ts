export type PasswordValidationResult = { valid: boolean; errors: string[] };

const SPECIALS = "!@#$%^&*";

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Only accept specials from this exact set: (!@#$%^&*)
  const specialRe = new RegExp(`[${escapeForCharClass(SPECIALS)}]`);
  if (!specialRe.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)");
  }

  return { valid: errors.length === 0, errors };
}

function escapeForCharClass(chars: string): string {
  // escape characters that are special inside [...] like \, -, ], ^
  return chars.replace(/[-\\\]^]/g, "\\$&");
}
