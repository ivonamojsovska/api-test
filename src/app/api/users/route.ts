import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/users";

const API_KEY = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const users: User[] = await res.json();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email }: Partial<User> = await request.json();

  if (!name || !email)
    return NextResponse.json({ message: "User data  required" });

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      name,

      email,
    }),
  });

  const newUser: User = await res.json();

  return NextResponse.json(newUser);
}

export async function DELETE(request: Request) {
  const { id }: Partial<User> = await request.json();

  if (!id) return NextResponse.json({ message: "User id is required" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({ message: `User with id ${id} deleted` });
}
