//storage reset
export const handleResetQuery = (keys: string[]) => {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get('reset') === '1') {
      keys.forEach(k => localStorage.removeItem(k));
      url.searchParams.delete('reset');
      window.history.replaceState({}, '', url.toString());
      // reload once so app picks up defaults
      window.location.reload();
    }
  } catch {
    // ignore in non-browser environments
  }
};