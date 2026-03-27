# e-clock.top - Online Digital Clock with Multiple Time Tools

A comprehensive web-based time management platform featuring a digital clock, world clock, timer, stopwatch, alarm, and weather information. Perfect for productivity, studying, workouts, cooking, and general time management needs.

## 🌟 Features

### ⏰ Digital Clock
- Real-time digital clock display
- Current date with full weekday format
- Clean, readable interface

### 🌍 World Clock
- Over 400+ cities worldwide
- Real-time timezone conversion
- Country flags for easy identification
- Automatic time updates every minute

### ⏲️ Timer
- Customizable countdown timer
- Set time in seconds
- Start, pause, and reset functionality
- Audio notification when timer completes

### ⏱️ Stopwatch
- Precision stopwatch with start/pause/reset
- Minutes and seconds display
- Simple and intuitive controls

### 🔔 Alarm Clock
- Set custom alarm times
- Audio alarm sound
- 5-minute snooze functionality
- Visual and audio notifications

### 🌤️ Weather Information
- Automatic location detection via IP
- Current temperature and conditions
- Detailed weather metrics (humidity, wind speed, pressure, feels like)
- Weather icons and descriptions
- Powered by Open-Meteo API

### ✨ Additional Features
- **Light/Dark Mode Toggle** - Switch between themes
- **Fullscreen Mode** - Distraction-free experience
- **Quote of the Day** - Inspirational daily quotes
- **Responsive Design** - Works on all devices
- **No Downloads Required** - Runs entirely in browser
- **Privacy Focused** - No user data collection

## 🚀 Live Demo

Visit [e-clock.top](https://e-clock.top) to try it live!

## 📱 Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with custom properties and responsive design
- **Vanilla JavaScript** - Core functionality and API integrations
- **Open-Meteo API** - Weather data
- **ipapi.co** - Location detection
- **Timeapi.io** - World clock functionality

```

## 🎯 Use Cases

- **Productivity**: Pomodoro technique with timer and breaks
- **Studying**: Time management for study sessions
- **Cooking**: Kitchen timer for recipes and cooking times
- **Fitness**: Workout intervals and rest periods
- **Remote Work**: World clock for international team coordination
- **General**: Daily time management and weather updates

## 🔧 Customization

### Modifying Colors
Edit the CSS custom properties in the `:root` section:

```css
:root {
  --color-bg: #111;
  --color-container: #222;
  --color-primary: #ff9800;
  /* ... other variables */
}
```

### Adding New Cities
Add new options to the world clock select element:

```html
<option value="timezone/location">🏳️ City Name</option>
```

### Customizing Timer Sounds
Replace the alarm sound source in the HTML:

```html
<audio id="alarmSound" src="your-sound-file.wav" preload="auto"></audio>
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and formatting
- Test on multiple browsers and devices
- Keep accessibility in mind (ARIA labels, keyboard navigation)
- Optimize for performance and SEO
- Document any new features or changes

### Ideas for Contributions

- [ ] Add more alarm sound options
- [ ] Implement PWA features (offline support)
- [ ] Add more time zones
- [ ] Create themes/skins
- [ ] Add keyboard shortcuts
- [ ] Implement time tracking features
- [ ] Add export functionality for timers
- [ ] Create mobile app version

## 🙋 Website: [e-clock.top](https://e-clock.top)

## 📊 Stats

- **File Size**: ~50KB total
- **Load Time**: <2 seconds
- **Dependencies**: Zero external libraries
- **API Calls**: Minimal (weather + world clock only)
- **Offline Support**: Partial (main features work offline)

## 🔄 Changelog

### v2.0.0 (Current)
- Added world clock with 400+ cities
- Implemented weather integration
- Added light/dark mode toggle
- Improved responsive design
- Enhanced accessibility

### v1.0.0
- Initial release
- Basic clock, timer, stopwatch, alarm functionality

---

Made with ❤️ for better time management. Star ⭐ this repo if you find it useful!
