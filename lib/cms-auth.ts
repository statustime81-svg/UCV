import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../app/chatgpt-auth';
export async function adminUser() {
    const user = await getChatGPTUser();
    if (!user)
        return null;
    const settings = env as unknown as Record<string, string>;
    const allowed = (settings.CMS_ADMIN_EMAILS || 'premranjan552@gmail.com').toLowerCase().split(',').map(x => x.trim());
    return allowed.includes(user.email.toLowerCase()) ? user : null;
}
export function sameOrigin(req: Request) { return req.headers.get('origin') === new URL(req.url).origin; }

