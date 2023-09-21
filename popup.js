// adding a new bookmark row to the popup
import { getActiveTabUrl } from './utils';
const addNewBookmark = () => {};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarkElement = document.getElementById('bookmarks');
  bookmarkElement.innerHTML = '';

  if (bookmarkElement.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarkElement, bookmark);
    }
  } else {
    bookmarkElement.innerHTML = '<i class="row">No bookmark to show</i>';
  }
};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = () => {};

document.addEventListener('DOMContentLoaded', async () => {
  const activeTab = await getActiveTabUrl();
  const queryParameters = activeTab.url.split('?')[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get('v');
  if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
    chrome.storage.sync.set([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    document.getElementsByClassName('container')[0].innerHTML =
      '<div class="title">This is not a youtube video</div>';
  }
});
