/**
 * Get the auth token from local storage if it exists.
 *
 * Warning: This is not the intended way to get the auth token longterm.
 *
 * @returns auth token from local storage if it exists, otherwise null
 */
export function getLocalStorageAuthToken(): string | null {
  const token = localStorage.getItem("token");
  return token ?? null;
  // return token ? `Bearer ${token}` : null;
}

/**
 * Determine if a URL is absolute or relative.
 *
 * @param url The URL to check
 * @returns true if the URL is absolute, false if it is relative
 */
export function isUrlAbsolute(url: string): boolean {
  return url.indexOf("://") > 0 || url.indexOf("//") === 0;
}
