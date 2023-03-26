let longpressTimer;

function startLongpressTimer() {
  longpressTimer = setTimeout(() => {
    let url = window.location.href;
    getPreviewData(url)
      .then((preview) => {
        showPreviewCard(url, preview);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 500);
}

function cancelLongpressTimer() {
  clearTimeout(longpressTimer);
}

function handleClick(event) {
  let url = event.target.href;
  if (url) {
    event.preventDefault();
    getPreviewData(url)
      .then((preview) => {
        showPreviewCard(url, preview);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

document.addEventListener('mousedown', startLongpressTimer);
document.addEventListener('mouseup', cancelLongpressTimer);
document.addEventListener('click', handleClick);
