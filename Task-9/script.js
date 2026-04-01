const routes = {
  home: `
  <h1 class="home-title"><img src="./assets/logo.png" alt="logo" id="logo"> Seven Swaras</h1>
  <p class="home-desc">
    A fast, interactive mini-encyclopedia of the fundamental notes in Indian classical music.
  </p>

  <div class="home-features">
    <div>🎼 Full Swara Name</div>
    <div>🔢 Numerical Position</div>
    <div>🦚 Associated Animal</div>
    <div>🪐 Planet Connection</div>
    <div>🎨 Symbolic Color</div>
  </div>

  <p class="home-footer">
    Click on any swara above to explore ✨
  </p>
`,
  sa: `
    <div class="name inner-card">Shadja (Sa)</div>
    <div class="number inner-card"><div class = "value">1<sup>st</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/peacock.png"></div><span>Animal: Peacock</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/mercury.png"></div><span>Planet: Mercury</span></div>
    <div class="color inner-card"><div class = "value green">Green</div><span>Color</span></div>

  `,
  re: `
    <div class="name inner-card">Rishabha (Re)</div>
    <div class="number inner-card"><div class = "value">2<sup>nd</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/bull.png"></div><span>Animal: bull</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/mars.png"></div><span>Planet: Mars</span></div>
    <div class="color inner-card"><div class = "value red">Red</div><span>Color</span></div>
  `,
  ga: `
    <div class="name inner-card">Gandhar (Ga)</div>
    <div class="number inner-card"><div class = "value">3<sup>rd</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/goat.png"></div><span>Animal: goat</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/sun.png"></div><span>Planet: Sun</span></div>
    <div class="color inner-card"><div class = "value golden">Golden</div><span>Color</span></div>
  `,
  ma: `
    <div class="name inner-card">Madhyam (Ma)</div>
    <div class="number inner-card"><div class = "value">4<sup>th</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/heron.png"></div><span>Animal: heron</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/moon.png"></div><span>Planet: Moon</span></div>
    <div class="color inner-card"><div class = "value white">White</div><span>Color</span></div>
  `,
  pa: `
    <div class="name inner-card">Pancham (Pa)</div>
    <div class="number inner-card"><div class = "value">5<sup>th</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/cuckoo.png"></div><span>Animal: cuckoo</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/saturn.png"></div><span>Planet: Saturn</span></div>
    <div class="color inner-card"><div class = "value blue">Blue</div><span>Color</span></div>
  `,
  dha: `
    <div class="name inner-card">Dhaivat (Dha)</div>
    <div class="number inner-card"><div class = "value">6<sup>th</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/horse.png"></div><span>Animal: horse</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/jupiter.png"></div><span>Planet: Jupiter</span></div>
    <div class="color inner-card"><div class = "value yellow">Yellow</div><span>Color</span></div>
  `,
  ni: `
    <div class="name inner-card">Nishad (Ni)</div>
    <div class="number inner-card"><div class = "value">7<sup>th</sup></div><span>Swara</span></div>
    <div class="animal inner-card"><div class = "value"><img src="./assets/elephant.png"></div><span>Animal: elephant</span></div>
    <div class="planet inner-card"><div class = "value"><img src="./assets/venus.png"></div><span>Planet: Venus</span></div>
    <div class="color inner-card"><div class = "value black">Black</div><span>Associated Color</span></div>
  `,
};

function render() {
  const app = document.getElementById("app");
  const hash = window.location.hash.substring(1);

  if (hash === "home" || hash === "") {
    app.className = "home-layout";
    app.innerHTML = routes.home;
  } else {
    app.className = "card-layout";
    app.innerHTML = routes[hash] || "<h1>404 - Page Not Found</h1>";
  }
}

window.onload = render;
window.onhashchange = render;
