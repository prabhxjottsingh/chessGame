import WebSocket from 'ws';
import { GameInfo } from './GameInfo';

export class GameManagerClass {
    gamesInfo: GameInfo[];
    pendingPlayer!: WebSocket | null;
    constructor() {
        this.gamesInfo = [];
    }
}