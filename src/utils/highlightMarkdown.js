export function highlightMarkdown(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^(# .+)$/gm, '<span class="text-amber-400">$1</span>')
    .replace(/^(## \d. .+)$/gm, '<span class="text-ink-50 font-medium">$1</span>')
    .replace(/`([^`]+)`/g, '<span class="text-amber-300">`$1`</span>')
}
