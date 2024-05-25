import { GameHandler } from './handlers/game-handler';
import { AddUserToGameRequest } from './modals/requests/add-user-to-game-request';
import { HanldePlayerMoveRequest } from './modals/requests/handle-player-move-request';
import { RemoveUserFromGameRequest } from './modals/requests/remove-user-from-game-request';

let gameHandler: GameHandler = new GameHandler();

export const addUserToGame = async (event: any) => {
    try {
        const reqParams = new AddUserToGameRequest(JSON.parse(event.body));
        console.log("Request Params: ", reqParams);
        await gameHandler.addUserToGame(reqParams);
    } catch (error) {
        console.error("Error while adding user to a game: ", error);
        throw error;
    }
};

export const removeUserFromGame = async (event: any) => {
    try {
        const reqParams = new RemoveUserFromGameRequest(JSON.parse(event.body));
        console.log("Request Params: ", reqParams);
        await gameHandler.removeUserFromGame(reqParams);
    } catch (error) {
        console.error("Error while removing user from game: ", error);
        throw error;
    }
};

export const handlePlayerMove = async (event: any) => {
    try {
        const reqParams = new HanldePlayerMoveRequest(JSON.parse(event.body));
        console.log("Request Params: ", reqParams);
        await gameHandler.handlePlayerMove(reqParams)
    } catch (error) {
        console.error("Error while processing player move: ", error);
        throw error;
    }
}
