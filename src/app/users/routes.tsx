export const users =[
    {id: 1, name: "John", email: "john@example.com"},
    {id: 2, name: "Doe", email: "doe@example.com"}
]
export async function GET() {
    return Response.json(users)
}
export async function POST(request: Request) {
    const user = await request.json();
    const newUser = {...user, id: users.length + 1};
    users.push(newUser);
    return new Response(JSON.stringify(newUser), {
        headers: {"Content-Type": "application/json"},
        status: 201
    })
}