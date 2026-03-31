window.onload = async function () {
  const api_url = "https://dog.ceo/api/breeds/image/random/15";
  const main = document.querySelector("main");

  let isFetching = false;

  function createContainer() {
    const section = document.createElement("section");
    section.setAttribute("class", "container");
    return section;
  }

  function createImgEle(imgUrl) {
    const imgEle = document.createElement("img");
    imgEle.setAttribute("src", imgUrl);
    imgEle.setAttribute("width", 200);
    return imgEle;
  }

  async function fetchAndRenderImages() {
    if (isFetching) return;

    isFetching = true;

    try {
      const response = await fetch(api_url);
      const data = await response.json();
      const arrayOfImages = data.message;
      const section = createContainer();

      arrayOfImages.forEach((imgUrl) => {
        const imgEle = createImgEle(imgUrl);
        section.appendChild(imgEle);
      });

      main.appendChild(section);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      isFetching = false;
    }
  }

  await fetchAndRenderImages();

  window.addEventListener("scroll", function () {
    const scrolledY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrolledToEnd =
      Math.ceil(scrolledY + viewportHeight) >= pageHeight - 30;

    if (scrolledToEnd) {
      fetchAndRenderImages();
    }
  });
};
