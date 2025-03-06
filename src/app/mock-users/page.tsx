import {revalidatePath} from 'next/cache';
import {auth, currentUser} from "@clerk/nextjs/server";

type User ={
    id: number,
    name: string,
}

export default async function MockUsers() {
    const response = await fetch('https://67c74c1ec19eb8753e795e84.mockapi.io/users')
    const users = await response.json();

    const authObj = await auth();
    const userObj = await currentUser();

    console.log("auth object",authObj);
    console.log("user object",userObj);

    // Add function to handle adding of user
    async function AddUser(formData: FormData) {
        "use server";
        const name = formData.get('name');
        const response = await fetch("https://67c74c1ec19eb8753e795e84.mockapi.io/users", {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const newUser = await response.json();
        revalidatePath("/mock-users");
        console.log(newUser);
    }


    return (
        <div className="py-10">
            <form action={AddUser} className="pb-4">
                <input type="text" name="name" className="border bg-white p-2 mr-2" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
            </form>
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
        </div>

    )
}