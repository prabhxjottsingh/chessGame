import WebSocket from 'ws';
import { BadRequestError } from '../errors/bad-request-error';

export class HanldePlayerMoveRequest {
    player: WebSocket;
    moveFrom: string;
    moveTo: string;
    constructor(reqObj: HanldePlayerMoveRequest) {
        if (!reqObj || !reqObj.player || !reqObj.moveFrom || !reqObj.moveTo) {
            throw new BadRequestError('Invalid Game object');
        }
        this.player = reqObj.player;
        this.moveFrom = reqObj.moveFrom;
        this.moveTo = reqObj.moveTo;
    }
};