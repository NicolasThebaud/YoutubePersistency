setInterval(() => {
  const toast = document.querySelector('.yt-simple-endpoint.style-scope.yt-button-renderer');
  if (toast && toast.click) {
    toast.click();
  }
}, 10000);