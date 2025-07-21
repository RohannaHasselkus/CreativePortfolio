// Shadowbox logic
const modal = document.getElementById("shadowboxModal");
const modalImg = document.getElementById("shadowboxImage");
const captionText = document.getElementById("shadowboxCaption");
const closeBtn = document.getElementById("closeShadowbox");

document.querySelectorAll('.image-wrapper img').forEach(img => {
  img.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = "block";
    modalImg.src = this.src;
    const overlay = this.nextElementSibling;
    captionText.innerHTML = overlay?.querySelector('.title')?.innerText || '';
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
}
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
