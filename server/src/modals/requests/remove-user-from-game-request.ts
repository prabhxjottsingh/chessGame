import { WebSocket } from "ws";
import { BadRequestError } from "../errors/bad-request-error";

export class RemoveUserFromGameRequest {
    player: WebSocket;
    constructor(reqObj: RemoveUserFromGameRequest) {
        if (!reqObj || !reqObj.player) {
            throw new BadRequestError('Invalid removeUser Request');
        }
        this.player = reqObj.player;
    }
}