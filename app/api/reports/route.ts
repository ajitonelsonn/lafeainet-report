import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProviderRow extends RowDataPacket {
  id: number;
  name: string;
}

interface DataPackageRow extends RowDataPacket {
  id: number;
  name: string;
}

interface ApiError extends Error {
  sqlMessage?: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const connection = await getConnection();

    const {
      provider,
      dataPackage,
      downloadSpeed,
      uploadSpeed,
      deviceInfo,
      locationLat,
      locationLng,
      comment,
    } = data;

    // Validate the coordinates
    const lat = parseFloat(locationLat);
    const lng = parseFloat(locationLng);

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid coordinates" },
        { status: 400 }
      );
    }

    // Insert the provider if it doesn't exist
    await connection.execute("INSERT IGNORE INTO providers (name) VALUES (?)", [
      provider,
    ]);

    // Get the provider ID
    const [rows] = await connection.execute<ProviderRow[]>(
      "SELECT id FROM providers WHERE name = ?",
      [provider]
    );

    const providerId = rows[0]?.id;

    if (!providerId) {
      return NextResponse.json(
        { success: false, message: "Failed to create or find provider" },
        { status: 400 }
      );
    }

    // Insert or get data package
    await connection.execute(
      "INSERT IGNORE INTO data_packages (provider_id, name) VALUES (?, ?)",
      [providerId, dataPackage]
    );

    const [packageRows] = await connection.execute<DataPackageRow[]>(
      "SELECT id FROM data_packages WHERE provider_id = ? AND name = ?",
      [providerId, dataPackage]
    );

    const dataPackageId = packageRows[0]?.id;

    if (!dataPackageId) {
      return NextResponse.json(
        { success: false, message: "Failed to create or find data package" },
        { status: 400 }
      );
    }

    // Insert the report with validated coordinates
    await connection.execute(
      `INSERT INTO network_reports 
       (provider_id, data_package_id, download_speed, upload_speed, device_info, 
        location_lat, location_lng, comment) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        providerId,
        dataPackageId,
        parseFloat(downloadSpeed),
        parseFloat(uploadSpeed),
        JSON.stringify(deviceInfo),
        lat.toFixed(6),
        lng.toFixed(6),
        comment,
      ]
    );

    // Get the inserted report id
    const [reportRows] = await connection.execute<RowDataPacket[]>(
      "SELECT LAST_INSERT_ID() as id"
    );
    const reportId = reportRows[0].id;

    // Initialize analysis results record
    await connection.execute(
      `INSERT INTO analysis_results 
       (report_id, sentiment_score, quality_score, sentiment_aspects, analysis_details) 
       VALUES (?, NULL, NULL, NULL, NULL)`,
      [reportId]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Report submitted successfully",
      reportId,
    });
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error("Error submitting report:", apiError);
    return NextResponse.json(
      {
        success: false,
        message: apiError.sqlMessage || "Failed to submit report",
        error: apiError.message,
      },
      { status: 500 }
    );
  }
}
