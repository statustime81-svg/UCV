import { Lang } from '../content/site';
import EnquiryForm from '../views/partner/EnquiryForm';
export default function EnquirySection({ l }: {
    l: Lang;
}) { return <section className="section bottom-enquiry" id="partner-enquiry"><div data-reveal><span className="eyebrow">UCV / {l === 'de' ? 'PARTNERANFRAGE' : 'PARTNERSHIP ENQUIRY'}</span><h2>{l === 'de' ? 'DER NÄCHSTE SCHRITT\\nBEGINNT MIT DIR.' : 'THE NEXT STEP\\nSTARTS WITH YOU.'}</h2><p>{l === 'de' ? 'Du möchtest eine Food-Marke in deiner bestehenden Küche betreiben? Erzähle uns von deinem Restaurant und deiner bevorzugten Marke. Wir prüfen deine Anfrage und besprechen die nächsten Schritte persönlich.' : 'Interested in operating a food brand from your existing kitchen? Tell us about your restaurant and your preferred brand. We will review your enquiry and discuss the next steps personally.'}</p><p>{l === 'de' ? 'Noch Fragen? Du erreichst uns auch per E-Mail oder WhatsApp.' : 'Still have questions? You can also contact us by email or WhatsApp.'}</p></div><EnquiryForm l={l}/></section>; }

