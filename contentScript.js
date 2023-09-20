(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = '';
  let currentVideoBookmark = '';
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === 'NEW') {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const newVideoLoaded = () => {
    const bookMarkBtnExists =
      document.getElementsByClassName('bookmark-btn')[0];
    if (!bookMarkBtnExists) {
      const bookmarkBtn = document.createElement('img');
      bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
      bookmarkBtn.className = 'ytp-button' + 'bookmark-btn';
      bookmarkBtn.title = 'Click to bookmark current timestamp';
      youtubeLeftControls =
        document.getElementsByClassName('ytp-left-controls')[0];
      youtubePlayer = document.getElementsByClassName('video-stream')[0];
      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
    }
  };

  const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      desc: 'Bookmark at' + getTime(currentTime),
    };
    console.log(newBookmark);
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmark, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  newVideoLoaded();
})();
const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().substring(11, 8);
};
