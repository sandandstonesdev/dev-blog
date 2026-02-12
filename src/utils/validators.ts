export const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;

export const isValidSlug = (slug: string): boolean => {
  return !!slug && SLUG_REGEX.test(slug);
};
