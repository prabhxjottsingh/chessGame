import WebSocket from 'ws';
import { BadRequestError } from '../errors/bad-request-error';

export class HanldePlayerMoveRequest {
    player: WebSocket;
    from: string;
    to: string;
    constructor(reqObj: HanldePlayerMoveRequest) {
        console.log(reqObj);
        if (!reqObj || !reqObj.player || !reqObj.from || !reqObj.to) {
            throw new BadRequestError('Invalid Game object');
        }
        this.player = reqObj.player;
        this.from = reqObj.from;
        this.to = reqObj.to;
    }
};