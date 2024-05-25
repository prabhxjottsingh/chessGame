import { WebSocketServer } from "ws";
import { GameHandler } from "./game-handler";
import { GameInfo } from "../modals/GameInfo";
export class WebSocketHandler {
    private wss!: WebSocketServer;
    constructor() { }
    
    sendMovesToPlayers() {
        // send moves to players
    }

    
}