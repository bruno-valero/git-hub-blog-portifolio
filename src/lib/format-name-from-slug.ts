export function formatNameFromSlug(slug: string) {
  return slug
    .replaceAll(/[-_]/gi, ' ')
    .split(' ')
    .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
    .join(' ')
}
