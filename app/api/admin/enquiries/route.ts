import { sameOrigin } from '../../../../lib/cms-auth';
import { EnquiryError, enquiryRest, requireEnquiryAdmin } from '../../../../lib/enquiry-admin';

function failure(error: unknown) {
  return Response.json(
    { error: error instanceof EnquiryError ? error.message : 'Enquiries are unavailable. Please retry.' },
    { status: error instanceof EnquiryError ? error.status : 503, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function GET(req: Request) {
  try {
    await requireEnquiryAdmin(req);
    const page = Number(new URL(req.url).searchParams.get('page') || 0);
    if (!Number.isSafeInteger(page) || page < 0 || page > 100000) throw new EnquiryError('Invalid page.', 400);
    const rows = await enquiryRest(
      `partner_enquiries?select=*&order=created_at.desc,id.desc&limit=26&offset=${page * 25}`,
    ) as Record<string, unknown>[];
    return Response.json(
      { enquiries: rows.slice(0, 25).map(row => ({ ...row, contacted: row.contacted === true || row.contacted === 1 })), hasMore: rows.length > 25 },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) { return failure(error); }
}

async function mutate(req: Request, method: 'PATCH' | 'DELETE') {
  try {
    if (!sameOrigin(req)) throw new EnquiryError('Invalid request origin.', 403);
    await requireEnquiryAdmin(req);
    if (!req.headers.get('content-type')?.includes('application/json')) throw new EnquiryError('Expected JSON.', 415);
    const raw = await req.text();
    if (raw.length > 1024) throw new EnquiryError('Request too large.', 413);
    let data: { id?: unknown; contacted?: unknown };
    try { data = JSON.parse(raw); } catch { throw new EnquiryError('Invalid request.', 400); }
    if (!data || typeof data.id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(data.id))
      throw new EnquiryError('Invalid enquiry.', 400);
    if (method === 'PATCH' && typeof data.contacted !== 'boolean') throw new EnquiryError('Choose a valid contact status.', 400);
    const result = await enquiryRest(
      `partner_enquiries?id=eq.${data.id}`,
      method,
      method === 'PATCH' ? { contacted: data.contacted } : undefined,
    );
    if (!Array.isArray(result) || !result.length) throw new EnquiryError('This enquiry no longer exists. Refresh the inbox.', 404);
    return Response.json({ saved: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return failure(error); }
}

export function PATCH(req: Request) { return mutate(req, 'PATCH'); }
export function DELETE(req: Request) { return mutate(req, 'DELETE'); }
