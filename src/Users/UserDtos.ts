export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CreateUserDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface UpdateUserDto {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}

// not sure if we will need this
export interface UserTokenDto {
    token: string,
    userId: number,
    expires: number,
    remoteAddress: string
}