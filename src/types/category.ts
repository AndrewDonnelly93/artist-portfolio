export const CATEGORY_OPTIONS = ['All', 'Portraits', 'Landscapes', 'Seascapes', 'Horses', 'Other Animals', 'Drawings'] as const;

export type Category = (typeof CATEGORY_OPTIONS)[number];

export const isCategory = (value: unknown): value is Category => {
  return CATEGORY_OPTIONS.includes(value as Category);
};