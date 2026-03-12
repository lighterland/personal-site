import { remark } from 'remark';
import remarkHtml from 'remark-html';

/** Convert a GFM pipe-table block into an HTML table.
 *  Handles header row, separator row, and data rows.
 */
function convertTableBlock(block: string): string {
  const lines = block.split('\n').filter(Boolean);
  if (lines.length < 3) return block; // not a valid table

  const parseRow = (line: string) =>
    line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const headers = parseRow(lines[0]);
  // lines[1] is the separator — skip it
  const rows = lines.slice(2).map(parseRow);

  const headerHtml = headers
    .map((h) => `<th>${h}</th>`)
    .join('');
  const rowsHtml = rows
    .map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('\n');

  return `<table>\n<thead><tr>${headerHtml}</tr></thead>\n<tbody>\n${rowsHtml}\n</tbody>\n</table>`;
}

/** Pre-process markdown: convert pipe tables → HTML tables before remark sees them. */
function preprocessTables(markdown: string): string {
  // Match contiguous lines that look like a table (start and end with |)
  return markdown.replace(
    /((?:^\|.+\|\s*\n){2,})/gm,
    (match) => convertTableBlock(match.trim()) + '\n\n',
  );
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const preprocessed = preprocessTables(markdown);
  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(preprocessed);
  return result.toString();
}

