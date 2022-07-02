export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

// not sure if we will need this
export interface UserTokenDto {
    token: string,
    userId: number,
    expires: number,
    remoteAddress: string
}