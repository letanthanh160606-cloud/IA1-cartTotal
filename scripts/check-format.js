import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// Kiểm tra các quy tắc whitespace cơ bản; không phải formatter đầy đủ.
export function formatIssues(text) {
  const issues = []
  const lines = text.split(/\r?\n/)

  for (const [index, line] of lines.entries()) {
    if (line.includes('\t')) {
      issues.push('line ' + (index + 1) + ': use spaces instead of tabs')
    }
    if (/[ \t]+$/.test(line)) {
      issues.push('line ' + (index + 1) + ': trailing whitespace')
    }
  }

  if (!text.endsWith('\n')) {
    issues.push('missing final newline')
  }

  return issues
}

// Chỉ duyệt thư mục code và workflow; không duyệt .git hoặc node_modules.
async function collectFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = directory + '/' + entry.name
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path))
    } else if (/\.(js|yml|yaml)$/.test(entry.name)) {
      files.push(path)
    }
  }
  return files
}

const files = ['package.json']
for (const directory of ['src', 'test', 'scripts', '.github/workflows']) {
  files.push(...await collectFiles(fileURLToPath(new URL('../' + directory, import.meta.url))))
}

const problems = []
for (const file of files) {
  const path = file === 'package.json'
    ? new URL('../package.json', import.meta.url)
    : file
  const text = await readFile(path, 'utf8')
  for (const issue of formatIssues(text)) {
    problems.push(file + ': ' + issue)
  }
}

if (problems.length > 0) {
  throw new Error('Format check failed:\n' + problems.join('\n'))
}

console.log('Format check passed (' + files.length + ' files)')
