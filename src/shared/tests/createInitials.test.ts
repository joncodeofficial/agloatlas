import { createInitials } from '@/shared/lib/createInitials';

describe('createInitials', () => {
  it('returns empty string for empty input', () => {
    expect(createInitials('')).toBe('');
  });

  it('returns empty string for whitespace-only input', () => {
    expect(createInitials('   ')).toBe('');
  });

  it('takes the first letter of a single word', () => {
    expect(createInitials('Juan')).toBe('j');
  });

  it('takes the first letter of each word', () => {
    expect(createInitials('Juan Perez')).toBe('jp');
  });

  it('ignores extra whitespace between words', () => {
    expect(createInitials('  Juan   Perez  ')).toBe('jp');
  });

  it('supports accented and Spanish letters', () => {
    expect(createInitials('Íñigo Núñez')).toBe('ín');
  });

  it('appends the first digit of a trailing number', () => {
    expect(createInitials('Finca 2026')).toBe('f2');
  });

  it('ignores digits that are not at the end of the string', () => {
    expect(createInitials('3 Fincas')).toBe('f');
  });
});
