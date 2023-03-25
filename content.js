let longpressTimer;

function startLongpressTimer() {
  longpressTimer = setTimeout(() => {
    let url = window.location.href;
    let preview = getPreviewData(url);
    showPreviewCard(url, preview);
  }, 500);
}

function cancelLongpressTimer() {
  clearTimeout(longpressTimer);
}

function handleClick(event) {
  let url = event.target.href;
  if (url) {
    event.preventDefault();
    let preview = getPreviewData(url);
    showPreviewCard(url, preview);
  }
}

document.addEventListener('mousedown', startLongpressTimer);
document.addEventListener('mouseup', cancelLongpressTimer);
document.addEventListener('click', handleClick);
