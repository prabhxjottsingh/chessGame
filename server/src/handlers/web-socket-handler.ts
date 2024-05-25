import { WebSocket, WebSocketServer } from "ws";
import { GameHandler } from "./game-handler";
import { GameInfo } from "../modals/GameInfo";
import { EVENT_TYPE } from "../Utils/constants";
import { AddUserToGameRequest } from "../modals/requests/add-user-to-game-request";
import { HanldePlayerMoveRequest } from "../modals/requests/handle-player-move-request";
import { RemoveUserFromGameRequest } from "../modals/requests/remove-user-from-game-request";

export class WebSocketHandler {
    private gameHandler: GameHandler = new GameHandler();
    constructor() { }

    async createGame(socket: WebSocket) {
        socket.on('message', async (message: string) => {
            const event = JSON.parse(message.toString());

            switch (event.type) {

                // if game is initiated by a user, add the user to the game
                case EVENT_TYPE.INIT_GAME:
                    this.gameHandler.addUserToGame(new AddUserToGameRequest({ player: socket }));
                    break;

                // if player makes a move, handle the move
                case EVENT_TYPE.PLAYER_MOVE:
                    this.gameHandler.handlePlayerMove(new HanldePlayerMoveRequest({
                        player: socket,
                        from: event.move.from,
                        to: event.move.to
                    }));

            }
        });
    }

    async endGame(socket: WebSocket) {
        this.gameHandler.removeUserFromGame(new RemoveUserFromGameRequest({
            player: socket
        }));
    }

}