import { ChangeEvent, useState } from "react";

export type User = {
    name: string
    password: string
}

export function CreateUser(){
    const [users, setUsers] = useState<User[]>([])
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleOnAddUser = () => {
        if (typeof name === "string" && typeof password === "string") setUsers((prev) => [...prev, {name, password}])
        else throw new Error("Invalid values in input")
    }

    const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
    const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    
    return(
        <form>
            <input value={name} data-testid="nameInput" onChange={handleOnChangeName}/>
            <input value={password} data-testid="passwordInput" onChange={handleOnChangePassword}/>
            <button onClick={() => handleOnAddUser()}>Register</button>
        </form>  
    );
}