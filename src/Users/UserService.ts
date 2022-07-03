import { UserDto } from "./UserDtos"
import { useAuth } from "../Auth/Auth";

export class UserService {

    token: string;

    constructor(token?: string) {
        this.token = (token) ?? '';
    }

    setToken = (token: string) => {
        this.token = token;
    }

    listUsers = async () => {
        const url = process.env.REACT_APP_BACKEND_HOST + '/users';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (response.status === 200) {
                let responseData = await response.json();
                return responseData.data;
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Resource not found!');
                    case 401:
                        throw new Error('Unauthorized');
                    case 500:
                        throw new Error('System Error');
                    default:
                        throw new Error('Error when contacting API server');
                }
            }
        } catch (err) {
            throw err;
        }     
    }

    addUser = async (details: UserDto) => {

    }

    updateUser = async (id: number, details: UserDto) => {

    }

    deleteUser = async (id: number) => {
        const url = process.env.REACT_APP_BACKEND_HOST + `/users/${id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.status === 200) {
                return true;
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Resource not found!');
                    case 401:
                        throw new Error('Unauthorized');
                    case 500:
                        throw new Error('System Error');
                    default:
                        throw new Error('Error when contacting API server');
                }
            }
        } catch (err) {
            throw err;
        }
    }


}