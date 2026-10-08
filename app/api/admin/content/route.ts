export async function GET() { return Response.json({ message: 'Content is now edited in source files.' }, { status: 410 }); }
export const POST = GET;
export const PUT = GET;

