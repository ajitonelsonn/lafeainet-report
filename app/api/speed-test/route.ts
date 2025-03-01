// app/api/speed-test/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read the request body
    const body = await request.arrayBuffer();

    // Simulate some processing time to make the test more realistic
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      bytesReceived: body.byteLength,
    });
  } catch (error) {
    console.error("Speed test error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Configure larger body size limit if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
