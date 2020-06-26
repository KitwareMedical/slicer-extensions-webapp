import { Extension } from '@/lib/api/extension.service';

function getCategories(extensions: Extension[]): Array<[string, number]> {
  const categories = new Map<string, number>();
  extensions.forEach((e) => {
    const existing = categories.get(e.meta.category);
    categories.set(e.meta.category, existing ? existing + 1 : 1);
  });
  return Array.from(categories.entries());
}

export {
  getCategories,
};
