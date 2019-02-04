# Team Predictor

> Lets your predict football team and compare with others.

**Demo**: [weltmeisterschaft-2018 @WELT](https://www.welt.de/sport/interaktiv/weltmeisterschaft-2018/wm-kader.html)

### Development

```bash
# Install dependencies
npm install

# Serve at localhost:8080
npm run dev
```

### Customization

To configure a team, update [configData.json](src/data/configData.json) file as per your requirements. This is initialized within vuex store and serves through components in application.

### Build

```bash
# Build for production with minification
npm run build

# ~Build for production and view the bundle analyzer report
npm run build --report
```

## License

MIT
