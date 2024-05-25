import WebSocket from 'ws';
import { BadRequestError } from '../errors/bad-request-error';

export class AddUserToGameRequest {
    player: WebSocket;
    constructor(reqObj: AddUserToGameRequest) {
        if (!reqObj || !reqObj.player) {
            throw new BadRequestError('Invalid Game object');
        }
        this.player = reqObj.player;
    }
};