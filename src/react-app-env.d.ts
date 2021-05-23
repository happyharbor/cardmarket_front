/// <reference types="react-scripts" />
interface IUserToken {
    token: string
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