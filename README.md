# Team Predictor

> Lets users predict their football team and compare with others

**Demo**: [weltmeisterschaft-2018 @WELT](https://www.welt.de/sport/interaktiv/weltmeisterschaft-2018/wm-kader.html)

### Development

```bash
# Install dependencies
yarn

# Serve at localhost:8080
yarn dev
```

### Customization

#### Players Configuration

To configure a team, update [configData.json](src/data/configData.json) file as per your requirements. This initializes vuex store and pipe data to components within application scope.

#### Firebase Configuration

The firebase request to get List of World Leaders button can be configured at [configFirebase.json](src/data/configFirebase.json)

### Build

```bash
# Build for production with minification
yarn build

# ~Build for production and view the bundle analyzer report
yarn build --report
```

## License

MIT
