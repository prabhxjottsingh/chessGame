import { WebSocket, WebSocketServer } from "ws";
import { AddUserToGameRequest } from "../modals/requests/add-user-to-game-request";
import { RemoveUserFromGameRequest } from "../modals/requests/remove-user-from-game-request";
import { GameManagerClass } from "../modals/GameManagerClass";
import { GameInfo } from "../modals/GameInfo";
import { WebSocketHandler } from "./web-socket-handler";
import { HanldePlayerMoveRequest } from "../modals/requests/handle-player-move-request";
import { Chess } from "chess.js";

export class GameHandler {
    private gamesData: GameManagerClass = new GameManagerClass();
    private webSocketHandler: WebSocketHandler = new WebSocketHandler();
    private chess = new Chess();
    static currentGameId: number = 0;
    constructor() { }

    async addUserToGame(req: AddUserToGameRequest) {
        const pendingPlayer = this.gamesData.pendingPlayer;
        if (pendingPlayer) {
            this.gamesData.gamesInfo.push(new GameInfo({
                id: GameHandler.currentGameId++,
                player1: pendingPlayer,
                player2: req.player
            }));
            this.gamesData.pendingPlayer = {} as WebSocket;
            // start the game
            // add webSockets and generate a connection, send the game info to both players
        } else {
            this.gamesData.pendingPlayer = req.player;
        }
    }

    async removeUserFromGame(req: RemoveUserFromGameRequest) {

    }

    async handlePlayerMove(req: HanldePlayerMoveRequest) {
        const playerSocket = req.player;
        const gameIndex = this.gamesData.gamesInfo.findIndex((gameData) => {
            return gameData.player1 === playerSocket || gameData.player2 === playerSocket;
        });
        if (gameIndex === -1) {
            throw new Error('Player not found in any game');
        } else {
            this.gamesData.gamesInfo[gameIndex].board.move({
                from: req.moveFrom,
                to: req.moveTo
            });
            // send the updated boardState through socket to both of the players
        }
    }

};