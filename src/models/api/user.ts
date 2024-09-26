export interface RegisterUserDTO {
    nome: string,
    annoNascita: number,
    genere: string,
    immagine: string,
    email: string,
    password: string,
}

export interface LoginUserDTO {
    email: string,
    password: string,
}

export interface LoggedUser {
    token: string,
    user: UserInfo
}

export interface UserInfo {
    nome: string,
    immagine: string,
    email: string,
    id: string
}