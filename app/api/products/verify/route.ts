import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// Obtener el FormData del request original
		const formData = await request.formData();

		// Hacer la petición al backend
		const response = await fetch("http://localhost:3000/api/products/verify", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		// Devolver la respuesta del backend
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		console.error("Error en proxy:", error);
		return NextResponse.json(
			{ 
				error: "Error conectando con el backend",
				message: error instanceof Error ? error.message : String(error)
			},
			{ status: 500 }
		);
	}
}
