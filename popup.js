let previewCard = document.getElementById('preview-card');
let openButton = document.getElementById('open-button');
let bookmarkButton = document.getElementById('bookmark-button');
let title = document.getElementById('preview-title');
let description = document.getElementById('preview-description');
let security = document.getElementById('preview-security');
let owner = document.getElementById('preview-owner');
let onlineUsers = document.getElementById('preview-online-users');
let totalUsers = document.getElementById('preview-total-users');
let image = document.getElementById('preview-image');

function showPreviewCard(url, preview) {
  title.textContent = preview.title;
  description.textContent = preview.description;
  security.textContent = preview.security;
  owner.textContent = preview.owner;
  onlineUsers.textContent = preview.users;
  totalUsers.textContent = preview.total_users;
  image.style.backgroundImage = `url(${preview.image})`;
  previewCard.classList.add('show');
  bookmarkButton.classList.toggle('bookmarked', isBookmarked(url));
}

function hidePreviewCard() {
  previewCard.classList.remove('show');
}

function isBookmarked(url) {
  return localStorage.getItem(url) !== null;
}

function toggleBookmark() {
  let url = window.location.href;
  if (isBookmarked(url)) {
    localStorage.removeItem(url);
  } else {
    let preview = getPreviewData(url);
    localStorage.setItem(url, JSON.stringify(preview));
  }
  bookmarkButton.classList.toggle('bookmarked');
}

function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus();
}

async function getPreviewData(url) {
  let response = await fetch(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=YOU_API_KEY_FROM_opengraph`);
  let data = await response.json();
  return {
    title: data.hybridGraph.title,
    description: data.hybridGraph.description,
    image: data.hybridGraph.image,
    security: 'Not rated',
    owner: 'Unknown',
    users: '0',
    total_users: '0'
  };
}

openButton.addEventListener('click', () => {
  openInNewTab(window.location.href);
});

bookmarkButton.addEventListener('click', () => {
  toggleBookmark();
});

document.addEventListener('DOMContentLoaded', () => {
  let url = window.location.href;
  let preview = JSON.parse(localStorage.getItem(url));
  if (preview) {
    showPreviewCard(url, preview);
  } else {
    getPreviewData(url).then((preview) => {
      showPreviewCard(url, preview);
    }).catch((error) => {
      console.error(error);
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hidePreviewCard();
  }
});
