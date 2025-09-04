import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";
import { RowDataPacket } from "mysql2";
import { UploadApiResponse } from "cloudinary";

// GET /api/schools → fetch all schools
export async function GET() {
  try {
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM schools");
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/schools → add a new school
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const image = formData.get("image") as File | null;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "schools", public_id: uuidv4(), resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imageUrl]
    );

    return NextResponse.json({ message: "School added successfully!" }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
