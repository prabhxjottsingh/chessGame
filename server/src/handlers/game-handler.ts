import { WebSocket, WebSocketServer } from "ws";
import { AddUserToGameRequest } from "../modals/requests/add-user-to-game-request";
import { RemoveUserFromGameRequest } from "../modals/requests/remove-user-from-game-request";
import { GameManagerClass } from "../modals/GameManagerClass";
import { GameInfo } from "../modals/GameInfo";
import { HanldePlayerMoveRequest } from "../modals/requests/handle-player-move-request";
import { Chess } from "chess.js";
import { EVENT_TYPE } from "../Utils/constants";
import { WebSocketHandler } from "./web-socket-handler";



export class GameHandler {
    static currentGameId: number = 1;
    private gamesData: GameManagerClass = new GameManagerClass();
    constructor() { }

    async addUserToGame(req: AddUserToGameRequest) {
        const pendingPlayer = this.gamesData.pendingPlayer;
        if (pendingPlayer) {
            console.log('Game is created', GameHandler.currentGameId++);
            const gameInfo: GameInfo = new GameInfo({
                id: GameHandler.currentGameId++,
                player1: pendingPlayer,
                player2: req.player
            });
            this.gamesData.gamesInfo.push(gameInfo);
            this.sendMessageToWebSocket(gameInfo, JSON.stringify({
                player1Color: 'white',
                player2Color: 'black'
            }), EVENT_TYPE.INIT_GAME);
            this.gamesData.pendingPlayer = null;
        } else {
            this.gamesData.pendingPlayer = req.player;
        }
    }

    async removeUserFromGame(req: RemoveUserFromGameRequest) {

    }

    async handlePlayerMove(req: HanldePlayerMoveRequest) {
        const playerSocket = req.player;
        const currGameInfoIdx = this.gamesData.gamesInfo.findIndex((gameData) => {
            return gameData.player1 === playerSocket || gameData.player2 === playerSocket;
        })
        const gameInfo: GameInfo = this.gamesData.gamesInfo[currGameInfoIdx];

        gameInfo.board.move({
            from: req.from,
            to: req.to
        });


        // updateTheBoardState
        this.gamesData.gamesInfo[currGameInfoIdx] = gameInfo;

        // sendMessageToWebSocket Updating the State
        this.sendMessageToWebSocket(gameInfo, JSON.stringify({
            board: gameInfo.board.fen()
        }), EVENT_TYPE.UPDATE_BOARD);

        // gameOver, Draw
        if (gameInfo.board.isGameOver()) {
            // send the game over message to both of the players
            this.sendMessageToWebSocket(gameInfo, JSON.stringify({
                gameState: 'draw'
            }), EVENT_TYPE.GAME_OVER);
        }

        //gameCheckmate
        if (gameInfo.board.isCheckmate()) {
            // send the checkmate message to the player
            this.sendMessageToWebSocket(gameInfo, JSON.stringify({
                winner: gameInfo.board.turn() === 'w' ? 'black' : 'whit'
            }), EVENT_TYPE.CHECKMATE);
        }
    }

    async sendMessageToWebSocket(gameInfo: GameInfo, message: string, eventType: EVENT_TYPE) {
        console.log('Sending message to both of the players', JSON.stringify(gameInfo));
        gameInfo.player1.send(JSON.stringify({
            eventName: eventType,
            payload: message
        }));
        gameInfo.player2.send(JSON.stringify({
            eventName: eventType,
            payload: message
        }));
    }

};
