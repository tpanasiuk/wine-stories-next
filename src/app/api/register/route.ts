import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("wine-events");
    const collection = db.collection("registrations");

    await collection.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      eventId: body.eventId || null,
      eventTitle: body.eventTitle || null,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Registration saved!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving registration" },
      { status: 500 },
    );
  }
}
