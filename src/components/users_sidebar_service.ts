import {User,Room} from "../model/common";
import {CustomError} from "../model/CustomError";


function getAllUsers( onResult: (users: User[]) => void, onError: (error: CustomError) => void) {

    fetch("/api/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(async (response) => {
            if (response.ok) {
                const users = await response.json() as User[];
                onResult(users)
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        }, onError);
}

export function getAllRooms( onResult: (rooms: Room[]) => void, onError: (error: CustomError) => void) {

    fetch("/api/rooms",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(async (response) => {
            if (response.ok) {
                const rooms = await response.json() as Room[];
                onResult(rooms)
            } else {
                const error = await response.json() as CustomError;
                onError(error);
            }
        }, onError);
}

export {getAllUsers};