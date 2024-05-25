import { BadRequestError } from "../errors/bad-request-error";

export class RemoveUserFromGameRequest {
    player: WebSocket;
    gameId: number | null = null;
    constructor(reqObj: RemoveUserFromGameRequest) {
        if (!reqObj || !reqObj.player || !reqObj.gameId) {
            throw new BadRequestError('Invalid Game object');
        }
        this.player = reqObj.player;
        this.gameId = reqObj.gameId;
    }
}