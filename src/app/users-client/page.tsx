"use client"
import {useEffect, useState} from "react";

type user ={
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string
}

export default function UsersClient () {
    const [users, setUsers] = useState<user[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>("");

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
               if(!response.ok) throw new Error("Failed to fetch users")
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                setError("Failed to fetch users");
                if (error instanceof Error) {
                    console.error(error.message)
                }
            } finally {
                setLoading(false)
            }
        }

        getUsers()
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <ul className="space-y-4 p-4">
            {users.map((user) => (
                <li
                    key={user.id}
                    className="p-4 bg-white shadow-md text-gray-700 rounded-lg"
                >
                    {user.name} {user.email}
                </li>
            ))}
        </ul>
    )
}