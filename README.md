
# 🌍 Weather Globe App

An interactive 3D globe weather web app built using [Globe.gl](https://globe.gl), [Three.js](https://threejs.org), and the [OpenWeatherMap API](https://openweathermap.org/api).

Type a city name to zoom to its location on the globe and view live weather details including temperature, description, and weather icon.

---

## ✨ Features

- 🌐 3D Earth visualization with globe marker
- 🔍 City search + zoom-in animation
- 🌤️ Live weather data (temperature, feels like, conditions)
- ⚙️ Built with HTML, CSS, JavaScript
- 💡 Powered by Three.js and Globe.gl
- 🌎 Fully client-side, deployable via GitHub Pages

---

## 🚀 Live Demo

👉 [View Demo](https://your-username.github.io/weather-globe/)  
_(Replace with your actual GitHub Pages link)_

---

## 📦 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-globe.git
   cd weather-globe
````

2. Add your OpenWeatherMap API key in `script.js`:

   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_KEY";
   ```

3. Open `index.html` in your browser (or use Live Server).

---

## 📁 File Structure

```
weather-globe/
├── index.html         # Main HTML
├── style.css          # App styles
├── script.js          # Main JS logic
└── three.min.js       # Local Three.js (optional fallback)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Credits

* [Globe.gl](https://github.com/vasturiano/globe.gl)
* [Three.js](https://threejs.org)
* [OpenWeatherMap API](https://openweathermap.org)
