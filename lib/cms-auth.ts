import { getChatGPTUser } from '../app/chatgpt-auth';
export async function adminUser() {
    const user = await getChatGPTUser();
    if (!user)
        return null;
    const allowed = (process.env.CMS_ADMIN_EMAILS || '').toLowerCase().split(',').map(x => x.trim()).filter(Boolean);
    return allowed.includes(user.email.toLowerCase()) ? user : null;
}
export function sameOrigin(req: Request) { return req.headers.get('origin') === new URL(req.url).origin; }

