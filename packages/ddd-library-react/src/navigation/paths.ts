export const MEMBERS = 'members';
export const BOOKS = 'books';
export const WELCOME = 'welcome';
export const LOANS = 'loans';

export function getNavPath (path: string): string {
  return `/${path}`;
}