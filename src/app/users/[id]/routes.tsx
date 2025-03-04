import {users} from "@/app/users/routes";

export async function GET(_request:Request, {params}: {params: {id: string}})  {
    const {id} = params;
    const user = users.find(user => user.id === parseInt(id));
    if(user) {
        return new Response(JSON.stringify(user), {
            headers: {"Content-Type": "application/json"}
        })
    }
    return new Response("User not found", {status: 404})

}