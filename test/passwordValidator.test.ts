import { describe, it, expect } from "vitest";
import { validatePassword } from "../src/passwordValidator";

describe("validatePassword", () => {
  it("returns valid=true and empty errors for a strong password", () => {
    const res = validatePassword("Abcdef1!");
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual([]);
  });

  it("fails if less than 8 characters", () => {
    const res = validatePassword("Ab1!");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must be at least 8 characters long");
  });

  it("fails if missing uppercase letter", () => {
    const res = validatePassword("abcdef1!");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must contain at least one uppercase letter");
  });

  it("fails if missing lowercase letter", () => {
    const res = validatePassword("ABCDEF1!");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must contain at least one lowercase letter");
  });

  it("fails if missing number", () => {
    const res = validatePassword("Abcdefg!");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must contain at least one number");
  });

  it("fails if missing special character from the allowed set", () => {
    const res = validatePassword("Abcdefg1");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must contain at least one special character (!@#$%^&*)");
  });

  it("does not accept special characters outside the allowed set as satisfying the special-char rule", () => {
    const res = validatePassword("Abcdefg1?");
    expect(res.valid).toBe(false);
    expect(res.errors).toContain("Password must contain at least one special character (!@#$%^&*)");
  });

  it("returns multiple errors when multiple rules fail", () => {
    const res = validatePassword("short");
    expect(res.valid).toBe(false);
    expect(res.errors.length).toBeGreaterThan(1);
  });
});
