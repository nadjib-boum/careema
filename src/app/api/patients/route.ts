import db from "@/utils/db";

export async function GET() {

  try {
    
    const patients = await db.patient.findMany()

    return new Response(JSON.stringify({
      success: true,
      data: {
        patients
      }
    }), {
      status: 200,
    })

  } catch (error) {

    console.error('Error fetching patients:', error);
    return new Response(JSON.stringify({
      success: false,
      error: {
        message: 'Error fetching patients',
      }
    }), {
      status: 500,
    })

  }

}