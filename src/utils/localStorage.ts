const storageKey = "scrapKey";

export const toggleBookmark = (coinId: string) => {
  const bookmarks = JSON.parse(localStorage.getItem(storageKey) || "[]");

  if (bookmarks.includes(coinId)) {
    const updatedBookmarks = bookmarks.filter((id: string) => id !== coinId);
    localStorage.setItem(storageKey, JSON.stringify(updatedBookmarks));
  } else {
    const updatedBookmarks = [...bookmarks, coinId];
    localStorage.setItem(storageKey, JSON.stringify(updatedBookmarks));
  }
};

export const getAllBookmarks = () => {
  const existing = localStorage.getItem(storageKey);
  return existing ? JSON.parse(existing) : [];
};
