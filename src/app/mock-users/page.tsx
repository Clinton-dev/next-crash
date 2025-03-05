type User ={
    id: number,
    name: string,
}

export default async function MockUsers() {
    const response = await fetch('https://67c74c1ec19eb8753e795e84.mockapi.io/users')
    const users = await response.json();

    // Add function to handle adding of user
    // Add form to add user


    return (
        <ul className="grid grid-cols-4 gap-4 py-10">
            {users.map((user:User) => (
                <li
                    key={user.id}
                    className="p-4 bg-white shadow-md text-gray-700 rounded-lg"
                >
                    {user.name}
                </li>
            ))}
        </ul>
    )
}