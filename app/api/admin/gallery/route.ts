// Gallery is maintained in website source; the admin panel is enquiries-only.
function unavailable() {
    return Response.json(
        { error: 'Gallery management is disabled. Update gallery photographs in the website source.' },
        { status: 410, headers: { 'Cache-Control': 'no-store' } }
    );
}
export const GET = unavailable;
export const POST = unavailable;
export const DELETE = unavailable;
