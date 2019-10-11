# migratory-chess-app

Use [Node.js VM](https://nodejs.org/docs/latest-v8.x/api/vm.html) to preserve application's states.

- Frontend - [Next.js](https://nextjs.org/) + [React.js](https://reactjs.org/) + [Material-UI](https://material-ui.com/)
- Chess board - [Chessboard.jsx](https://chessboardjsx.com/)
- Chess library - [chess.js](https://github.com/jhlywa/chess.js)

## Usage
``` bash
$ git clone https://github.com/teamellipsis/migratory-chess-app
$ cd migratory-chess-app
```
Run development
``` bash
$ npm install
$ npm run dev-server
# Open in browser http://localhost:3000
```
``` bash
# If port 3000 busy(Address already in use) run in different port as below
# On UNIX
$ PORT=3001 npm run dev-server
# On Windows
$ set PORT=3001 && npm run dev-server
```
Run production
``` bash
$ npm install --production
$ npm run build
# On UNIX
$ npm run server
# On Windows
$ npm run server-win
```

## Build
```bash
# Without specifing app name. This will use package.json -> name as the app name.
$ npm run release
# Or specify app name as first argument.
$ npm run release -- "Chess Game"
```
Build file will put into `build` directory.
