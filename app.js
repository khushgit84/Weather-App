/* ========= SKYPULSE WEATHER — APP LOGIC ========= */
(() => {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // Weather data with cities
  const CITIES = {
    'new delhi': { temp: 34, feelsLike: 37, condition: 'Haze', icon: '🌫️', humidity: 55, wind: 14, visibility: 4, pressure: 1006, uv: 7,
      hourly: [28,27,26,26,27,29,31,33,34,35,34,33,31,30,29,28,27,27,26,26,25,25,25,26],
      forecast: [{day:'Mon',icon:'☀️',hi:36,lo:26},{day:'Tue',icon:'⛅',hi:35,lo:25},{day:'Wed',icon:'🌧️',hi:30,lo:23},{day:'Thu',icon:'⛈️',hi:28,lo:22},{day:'Fri',icon:'☀️',hi:33,lo:24}]},
    'london': { temp: 14, feelsLike: 12, condition: 'Cloudy', icon: '☁️', humidity: 78, wind: 22, visibility: 8, pressure: 1018, uv: 2,
      hourly: [12,11,11,10,10,10,11,12,13,14,14,15,15,14,14,13,13,12,12,11,11,10,10,10],
      forecast: [{day:'Mon',icon:'🌧️',hi:13,lo:8},{day:'Tue',icon:'☁️',hi:14,lo:9},{day:'Wed',icon:'🌧️',hi:12,lo:7},{day:'Thu',icon:'⛅',hi:15,lo:9},{day:'Fri',icon:'☀️',hi:17,lo:10}]},
    'new york': { temp: 22, feelsLike: 23, condition: 'Partly Cloudy', icon: '⛅', humidity: 60, wind: 18, visibility: 12, pressure: 1015, uv: 5,
      hourly: [19,18,18,17,17,17,18,19,20,21,22,23,23,23,22,22,21,20,20,19,19,18,18,18],
      forecast: [{day:'Mon',icon:'☀️',hi:24,lo:17},{day:'Tue',icon:'⛅',hi:23,lo:16},{day:'Wed',icon:'🌧️',hi:19,lo:14},{day:'Thu',icon:'☀️',hi:25,lo:18},{day:'Fri',icon:'☀️',hi:26,lo:19}]},
    'tokyo': { temp: 26, feelsLike: 28, condition: 'Sunny', icon: '☀️', humidity: 62, wind: 10, visibility: 15, pressure: 1012, uv: 6,
      hourly: [23,22,22,21,21,22,23,24,25,26,27,27,27,26,26,25,25,24,24,23,23,22,22,22],
      forecast: [{day:'Mon',icon:'☀️',hi:28,lo:22},{day:'Tue',icon:'⛅',hi:27,lo:21},{day:'Wed',icon:'🌧️',hi:24,lo:20},{day:'Thu',icon:'⛈️',hi:22,lo:19},{day:'Fri',icon:'☀️',hi:26,lo:21}]},
    'sydney': { temp: 18, feelsLike: 17, condition: 'Clear', icon: '☀️', humidity: 50, wind: 20, visibility: 18, pressure: 1022, uv: 4,
      hourly: [15,14,14,13,13,14,15,16,17,18,19,19,19,18,18,17,17,16,16,15,15,14,14,14],
      forecast: [{day:'Mon',icon:'☀️',hi:20,lo:13},{day:'Tue',icon:'⛅',hi:19,lo:12},{day:'Wed',icon:'☀️',hi:21,lo:14},{day:'Thu',icon:'🌧️',hi:17,lo:11},{day:'Fri',icon:'☀️',hi:22,lo:14}]},
    'paris': { temp: 16, feelsLike: 14, condition: 'Rain', icon: '🌧️', humidity: 82, wind: 25, visibility: 6, pressure: 1010, uv: 1,
      hourly: [14,13,13,12,12,12,13,14,15,16,16,17,17,16,16,15,15,14,14,13,13,13,12,12],
      forecast: [{day:'Mon',icon:'🌧️',hi:15,lo:10},{day:'Tue',icon:'🌧️',hi:14,lo:9},{day:'Wed',icon:'⛅',hi:17,lo:11},{day:'Thu',icon:'☀️',hi:19,lo:12},{day:'Fri',icon:'⛅',hi:18,lo:11}]},
    'dubai': { temp: 40, feelsLike: 44, condition: 'Hot', icon: '🔥', humidity: 35, wind: 16, visibility: 10, pressure: 1004, uv: 11,
      hourly: [35,34,33,33,33,34,36,38,39,40,41,42,42,41,40,39,38,37,36,36,35,35,34,34],
      forecast: [{day:'Mon',icon:'☀️',hi:42,lo:33},{day:'Tue',icon:'☀️',hi:41,lo:32},{day:'Wed',icon:'☀️',hi:43,lo:34},{day:'Thu',icon:'⛅',hi:39,lo:31},{day:'Fri',icon:'☀️',hi:40,lo:32}]},
    'mumbai': { temp: 30, feelsLike: 35, condition: 'Humid', icon: '🌤️', humidity: 80, wind: 12, visibility: 6, pressure: 1008, uv: 8,
      hourly: [28,27,27,27,27,28,29,30,30,31,31,31,31,30,30,30,29,29,28,28,28,27,27,27],
      forecast: [{day:'Mon',icon:'🌧️',hi:31,lo:26},{day:'Tue',icon:'⛈️',hi:29,lo:25},{day:'Wed',icon:'🌧️',hi:30,lo:25},{day:'Thu',icon:'⛅',hi:32,lo:26},{day:'Fri',icon:'☀️',hi:33,lo:27}]},
  };

  const DEFAULT_CITY = 'new delhi';

  function loadCity(name) {
    const key = name.toLowerCase().trim();
    const data = CITIES[key];
    if (!data) {
      alert(`City "${name}" not found. Try: New Delhi, London, New York, Tokyo, Sydney, Paris, Dubai, Mumbai`);
      return;
    }

    // Main card
    $('#weather-icon').textContent = data.icon;
    $('#temp').textContent = data.temp + '°';
    $('#condition').textContent = data.condition;
    $('#location').textContent = name.replace(/\b\w/g, c => c.toUpperCase());
    $('#feels-like').textContent = data.feelsLike + '°';

    // Date
    const now = new Date();
    $('#date-display').textContent = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

    // Metrics
    $('#wind').textContent = data.wind + ' km/h';
    $('#humidity').textContent = data.humidity + '%';
    $('#visibility').textContent = data.visibility + ' km';
    $('#pressure').textContent = data.pressure + ' hPa';
    $('#uv-index').textContent = data.uv;

    // Forecast
    const fc = $('#forecast-cards');
    fc.innerHTML = '';
    data.forecast.forEach(f => {
      fc.innerHTML += `<div class="forecast-card"><span class="fc-day">${f.day}</span><span class="fc-icon">${f.icon}</span><span class="fc-temp">${f.hi}°</span><span class="fc-low">${f.lo}°</span></div>`;
    });

    // Hourly chart
    const chart = $('#hourly-chart');
    chart.innerHTML = '';
    const maxT = Math.max(...data.hourly);
    const minT = Math.min(...data.hourly);
    const range = maxT - minT || 1;
    data.hourly.forEach((t, i) => {
      const pct = ((t - minT) / range) * 80 + 15;
      const label = i === 0 ? 'Now' : (i < 10 ? '0' + i : i) + ':00';
      chart.innerHTML += `<div class="hour-bar-wrap"><span class="hour-temp">${t}°</span><div class="hour-bar" style="height:${pct}%"></div><span class="hour-label">${label}</span></div>`;
    });
  }

  // Search
  $('#btn-search').addEventListener('click', () => loadCity($('#search-input').value));
  $('#search-input').addEventListener('keydown', e => { if (e.key === 'Enter') loadCity($('#search-input').value); });

  loadCity(DEFAULT_CITY);
})();
