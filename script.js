/* ============ CONFIG ============ */
const API_KEY = "311c17a2dd0e048208cb100895276c45";   //  <-- PUT your key here

/* ============ DOM REFS ============ */
const $ = q => document.querySelector(q);
const form    = $("#weatherForm");
const input   = $("#cityInput");
const wSec    = $("#weatherSection");
const cityOut = $("#cityName");
const iconImg = $("#icon");
const descP   = $("#description");
const tempP   = $("#temp");
const feelsP  = $("#feels");

/* ============ GLOBE INITIALISE ============ */
window.addEventListener("DOMContentLoaded", () => {
  const globe = Globe()(document.getElementById("globeViz"))
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundImageUrl("https://unpkg.com/three-globe/example/img/night-sky.png")
    .showAtmosphere(true).atmosphereColor("#3a228a").atmosphereAltitude(0.25)
    .showGraticules(true)
    .globeMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }))
    .backgroundColor("black");

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  let marker = null;                      // remember the red dot

  /* ============ FORM HANDLER ============ */
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const cityName = input.value.trim();
    if (!cityName) return;

    try {
      /* ---- WEATHER FETCH ---- */
      const wr = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      console.log("weather status →", wr.status);   // debug
      if (!wr.ok) throw new Error(await wr.text());
      const wd = await wr.json();
      console.log("weather data →", wd);            // debug

      /* ---- UPDATE UI ---- */
      cityOut.textContent = `${wd.name}, ${wd.sys.country}`;
      const { description, icon: code } = wd.weather[0];
      iconImg.src = `https://openweathermap.org/img/wn/${code}@2x.png`;
      iconImg.alt = description;
      descP.textContent  = description.toUpperCase();
      tempP.textContent  = `Temperature: ${wd.main.temp} °C`;
      feelsP.textContent = `Feels like: ${wd.main.feels_like} °C`;
      wSec.classList.remove("hidden");

      /* ---- GEO → GLOBE ---- */
      const geo = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${wd.name}&limit=1&appid=${API_KEY}`
      );
      console.log("geo status →", geo.status);      // debug
      const [loc] = await geo.json();
      if (!loc) return;
      const { lat, lon: lng } = loc;

      if (marker) globe.pointsData([]);             // clear previous
      marker = [{ lat, lng, size: 0.45, color: "#ff0000" }];
      globe.pointsData(marker).pointAltitude("size").pointColor("color");
      globe.pointOfView({ lat, lng, altitude: 2.1 }, 1500);

    } catch (err) {
      console.error(err);
      alert("⚠️ " + err.message);
      wSec.classList.add("hidden");
    }
  });
});
