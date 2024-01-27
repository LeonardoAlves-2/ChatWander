# ChatWander

This project is designed for learning and knowledge training. It implements a real-time random chat application using websockets. The server side is built with Node.js and TypeScript, while the frontend is developed using Angular.

## How to Run

### Server

1. Navigate to the "ChatWander.Server" folder.
2. Install dependencies using your package manager with the command: `pnpm install`.
3. Start the server with the following command: `pnpm start`.
4. The server will be running after executing the above steps.

### Portal (Frontend)

1. Download the dependencies using the command: `pnpm install`.
2. Start the portal with the command: `pnpm start`.
3. Open your browser and go to the default URL: [http://localhost:4200/](http://localhost:4200/).

**Note:** By default, the websocket uses port 8080. If you change this in the server's `index.ts` file, remember to update it in the portal's `src/configs/config.ts` file as well.