import { WebSocket } from 'ws';
import { BadRequestError } from './errors/bad-request-error';
import { Chess } from 'chess.js';

export class GameInfo {
    id: number;
    player1: WebSocket;
    player2: WebSocket;
    board: Chess;
    startTime: Date;
    boardState: string = "CurrentState";

    constructor(reqObj: Partial<GameInfo>) {
        if (!reqObj || !reqObj.id || !reqObj.player1 || !reqObj.player2) {
            throw new BadRequestError('Invalid Game object');
        }
        this.id = reqObj.id;
        this.player1 = reqObj.player1;
        this.player2 = reqObj.player2;
        this.startTime = new Date();
        this.board = new Chess();
    }
}
