import { WebSocketServer } from "ws";
import { WebSocketHandler } from "./handlers/web-socket-handler";

const wss = new WebSocketServer({ port: 8080 });
const webSocketHanlder: WebSocketHandler = new WebSocketHandler();

wss.on(`connection`, function connection(ws) {

    // connection is estabilished, creation and all other workings of the game are handled here only
    webSocketHanlder.createGame(ws);

    // connection is broken, thus end the game
    ws.on(`disconnect`, function disconnection(ws) {
        webSocketHanlder.endGame(ws);
    })
});