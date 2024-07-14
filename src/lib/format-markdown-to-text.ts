export function formatMarkdownToText(data: string) {
  return data
    .replaceAll(/\]\(.+\)|\[/g, '')
    .replaceAll(/[#]+/gi, '')
    .replaceAll(/[\s]+/gi, ' ')
    .replaceAll(/[*]+/gi, '')
    .replaceAll(/[_]+/gi, '')
    .trim()
}
