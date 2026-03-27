var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");
var images = document.querySelectorAll(".product img");

images.forEach((img) => {
  img.addEventListener("click", () => {
    fullImg.src = img.src;
    fullImgBox.classList.add("show");
  });
});

function closeFullImg() {
  fullImgBox.classList.remove("show");
}
