/// <reference types="react-scripts" />
interface IUserToken {
    token: string
    expiry: Date
}

interface IUser {
    id: string
    username: string
    createdAt: Date
    roles: string[]
}