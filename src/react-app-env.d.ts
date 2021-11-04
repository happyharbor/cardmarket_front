/// <reference types="react-scripts" />
interface IUserToken {
    token: string
    expiry: Date
}

enum ERole {
    Admin = "admin",
    User = "user"
}

interface IUser {
    id: string
    username: string
    createdAt: Date
    roles: string[]
}