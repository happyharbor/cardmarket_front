/// <reference types="react-scripts" />
interface IUserToken {
    token: string
}

interface IUser {
    id: string
    username: string
    createdAt: Date
    roles: string[]
}