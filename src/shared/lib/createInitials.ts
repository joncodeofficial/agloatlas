export function createInitials(fullName: string): string {
  const name = fullName.trim().toLowerCase();
  if (!name) return '';

  const words = name.split(/\s+/);
  let initials = '';

  for (const word of words) {
    const firstLetter = word.match(/[a-záéíóúüñ]/i);
    if (firstLetter) initials += firstLetter[0];
  }

  const numbers = name.match(/\d+$/);
  if (numbers) initials += numbers[0][0];

  return initials;
}
