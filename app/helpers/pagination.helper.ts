export function getCurrentPage(nextUrl: string, previousUrl: string): number {
  // Determine which URL to use (next or previous)
  const url = nextUrl || previousUrl

  // Extract offset and limit from the URL
  const params = new URLSearchParams(url.split('?')[1])
  const offset = Number.parseInt(params.get('offset') || '0', 10)
  const limit = Number.parseInt(params.get('limit') || '20', 10)

  // Calculate the current page number
  return Math.floor(offset / limit)
}
