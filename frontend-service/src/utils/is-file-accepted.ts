export function isFileAccepted(filename: string, accept: string): boolean {
  if (accept.trim() === '*') return true;

  const acceptedExtensions = accept
    .split(',')
    .map(ext => ext.trim().toLowerCase())
    .filter(ext => ext.startsWith('.'));

  const fileExtension = '.' + filename.split('.').pop()?.toLowerCase();

  if (!filename.includes('.') || !fileExtension) return false;

  return acceptedExtensions.includes(fileExtension);
}