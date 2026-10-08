"use client";

import { useContent } from '../../content/ContentProvider';
import { Lang } from '../../content/site';

const operator = {
    person: 'Anmol Kumar',
    business: 'Urban Culinary Venture (UCV)',
    formDe: 'Einzelunternehmen',
    formEn: 'sole proprietorship',
    addressDe: 'Baldersheimer Weg 28, 12349 Berlin, Deutschland',
    addressEn: 'Baldersheimer Weg 28, 12349 Berlin, Germany',
};

type Section = { title: string; paragraphs: string[]; bullets?: string[] };

export default function Privacy({ l }: { l: Lang }) {
    const { contact } = useContent();
    const de = l === 'de';

    const sections: Section[] = de ? [
        {
            title: '1. Verantwortlicher und Kontakt',
            paragraphs: [
                `${operator.person}, handelnd unter ${operator.business}, ${operator.formDe}, ${operator.addressDe}, ist für die Verarbeitung personenbezogener Daten über diese Website verantwortlich.`,
                `Für Datenschutzanfragen: ${contact.email}. Postalischer Kontakt: ${operator.person} / ${operator.business}, ${operator.addressDe}.`,
            ],
        },
        {
            title: '2. Welche Daten verarbeitet werden',
            paragraphs: [
                'Bei einer Partnerschaftsanfrage verarbeiten wir die im Formular eingegebenen Angaben: Name, Restaurantname, E-Mail-Adresse, optional Telefonnummer, Stadt oder Standort, Markeninteresse und Nachricht. Zusätzlich werden die ausgewählte Sprache, der Einwilligungsnachweis und der Eingangszeitpunkt gespeichert.',
                'Zum Schutz des Formulars werden ein verborgenes Kontrollfeld und eine Prüfung der Bearbeitungszeit eingesetzt. Für eine stündliche Begrenzung wiederholter Anfragen wird die IP-Adresse verarbeitet und zu einem Rate-Limit-Schlüssel gehasht. Der rohe IP-Wert wird nicht als Rate-Limit-Datensatz gespeichert.',
                'Wenn du uns direkt per E-Mail oder über den WhatsApp-Link kontaktierst, verarbeiten wir die Angaben und Nachrichteninhalte, die du selbst sendest. Beim Öffnen von WhatsApp gelten zusätzlich die Datenschutzbedingungen von WhatsApp/Meta.',
            ],
        },
        {
            title: '3. Zwecke und Rechtsgrundlagen',
            paragraphs: [
                'Wir verwenden deine Angaben, um die Partnerschaftsanfrage zu prüfen, sie zu beantworten und auf deinen Wunsch Gespräche über eine mögliche Zusammenarbeit zu führen. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe b DSGVO für vorvertragliche Schritte.',
                'Die Schutzmaßnahmen gegen automatisierte oder missbräuchliche Formularanfragen dienen der Sicherheit und Verfügbarkeit der Website. Rechtsgrundlage hierfür ist Artikel 6 Absatz 1 Buchstabe f DSGVO (berechtigtes Interesse).',
            ],
        },
        {
            title: '4. Speicherung und interne Bearbeitung',
            paragraphs: [
                'Die erste Partnerschaftsanfrage ist für die interne Prüfung durch UCV bestimmt. Sie wird nicht automatisch an Restaurantpartner, Lieferplattformen oder Marketingunternehmen weitergeleitet. Wenn eine Anfrage in ein Onboarding übergeht, informieren wir über notwendige Empfänger und die dafür erforderliche Verarbeitung.',
                'Das Website-Projekt kann Anfragen im Cloudflare-Laufzeitdienst und in der Vorschau-Datenbank D1 speichern. Wenn Supabase für den Livebetrieb verbunden ist, werden Anfragen dort gespeichert. Wenn der optionale E-Mail-Versand aktiviert ist, wird Resend zum Versand einer Benachrichtigung an die UCV-Geschäftsadresse verwendet.',
                'Anfragen sind nur für autorisierte Administratorkonten vorgesehen. Hosting-, Datenbank-, E-Mail- und Supportanbieter können technische Daten verarbeiten oder Zugriff erhalten, soweit dies für Betrieb und Support nötig ist.',
            ],
        },
        {
            title: '5. Speicherdauer und Löschung',
            paragraphs: [
                'Erfolglose oder inaktive Partnerschaftsanfragen werden sechs Monate nach der letzten inhaltlichen Kommunikation gelöscht, sofern kein dokumentierter Grund für eine längere Speicherung besteht. Bei einer aktiven Partnerschaft gelten die Aufbewahrungsregeln für Partner- und Vertragsunterlagen.',
                'Technische Rate-Limit-Datensätze werden nach Ablauf bei einer späteren Anfrage bereinigt.',
            ],
        },
        {
            title: '6. Hosting, technische Anbieter und Drittlandübermittlungen',
            paragraphs: [
                'Beim Aufruf der Website können notwendige Verbindungs- und Serverdaten verarbeitet werden, zum Beispiel IP-Adresse, Zeitpunkt, angefragte Seite sowie Browser- und Geräteinformationen. Je nach Live-Konfiguration können Cloudflare für Websitebetrieb und Hosting, Supabase für Datenbank- und Bildspeicherung sowie Resend für optionale E-Mail-Benachrichtigungen eingesetzt werden.',
                'Ein zusätzlicher CRM-Dienst ist im Website-Code nicht eingerichtet. Falls UCV außerhalb dieser Website einen CRM-Dienst nutzt, wird dieser hier ergänzt.',
            ],
        },
        {
            title: '7. Galerie, Cookies und externe Inhalte',
            paragraphs: [
                'Die Galerie kann freigegebene Speisen-, Restaurant- und Standortfotos sowie gegebenenfalls erkennbare Personen zeigen. UCV stellt Bilder nur ein, wenn die erforderliche Berechtigung für ihre Veröffentlichung vorliegt. Fragen oder Löschwünsche können an die Datenschutz-E-Mail oben gerichtet werden.',
                'Im aktuellen Website-Code sind keine Analyse- oder Werbetracker wie Google Analytics oder Meta Pixel eingerichtet. Schriftdateien und lokale Websitebilder werden von der Website selbst geladen. Der Administratorbereich kann technisch notwendige Sitzungs- oder Oberflächenspeicherung verwenden. Ein externer WhatsApp-Dienst wird erst geöffnet, wenn du den WhatsApp-Link auswählst.',
            ],
        },
        {
            title: '8. Deine Datenschutzrechte',
            paragraphs: [
                'Nach Maßgabe der gesetzlichen Voraussetzungen kannst du Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit verlangen. Du kannst einer Verarbeitung widersprechen, die auf berechtigten Interessen beruht. Eine erteilte Einwilligung kannst du mit Wirkung für die Zukunft widerrufen; die Verarbeitung bis zum Widerruf bleibt davon unberührt.',
                `Schreibe für Datenschutzanfragen an ${contact.email}. Du kannst dich außerdem bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit beschweren: Alt-Moabit 59-61, 10555 Berlin, Deutschland. Informationen: https://www.datenschutz-berlin.de.`,
            ],
        },
        {
            title: '9. Pflicht zur Bereitstellung und automatisierte Entscheidungen',
            paragraphs: [
                'Die Nutzung des Anfrageformulars ist freiwillig. Ohne die erforderlichen Angaben können wir deine Anfrage möglicherweise nicht bearbeiten. Nach aktuellem Website-Ablauf werden keine Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung ausschließlich automatisiert getroffen.',
            ],
        },
        {
            title: '10. Änderungen dieser Erklärung',
            paragraphs: ['Diese Erklärung wird aktualisiert, wenn sich das Formular, die eingesetzten Anbieter, Speicherfristen oder Empfänger ändern.'],
        },
    ] : [
        {
            title: '1. Controller and contact',
            paragraphs: [
                `${operator.person}, trading as ${operator.business}, a ${operator.formEn}, ${operator.addressEn}, is responsible for personal data processed through this website.`,
                `For privacy enquiries: ${contact.email}. Postal contact: ${operator.person} / ${operator.business}, ${operator.addressEn}.`,
            ],
        },
        {
            title: '2. Personal data processed',
            paragraphs: [
                'When you submit a partnership enquiry, we process the details entered in the form: name, restaurant name, email address, optional phone number, city or location, brand interest and message. The selected language, consent record and submission time are also stored.',
                'The form uses a hidden anti-spam field and a timing check. To limit repeated submissions, the website processes the IP address and hashes it into an hourly rate-limit key. The raw IP value is not stored as the rate-limit record.',
                'If you contact us directly by email or choose the WhatsApp link, we process the details and message you send. When WhatsApp opens, WhatsApp/Meta’s own privacy terms also apply.',
            ],
        },
        {
            title: '3. Purposes and legal bases',
            paragraphs: [
                'We use your details to review and respond to your partnership enquiry and, at your request, discuss possible cooperation. Article 6(1)(b) GDPR applies to steps taken before entering a potential partnership.',
                'Safeguards against automated or abusive form submissions help protect the website and its availability. Article 6(1)(f) GDPR applies to those safeguards (legitimate interests).',
            ],
        },
        {
            title: '4. Storage and internal handling',
            paragraphs: [
                'Initial partnership enquiries are intended for UCV’s internal review. They are not automatically forwarded to restaurant partners, delivery platforms or marketing companies. If an enquiry proceeds to onboarding, we will explain any necessary recipients and related processing.',
                'The website project can store enquiries through the Cloudflare runtime and the D1 preview database. If Supabase is connected for live operation, enquiries are stored there. If optional email delivery is enabled, Resend is used to send a notification to UCV’s business email.',
                'Enquiry access is intended for authorised administrator accounts. Hosting, database, email and support providers may process technical data or receive access as needed to operate and support the website.',
            ],
        },
        {
            title: '5. Retention and deletion',
            paragraphs: [
                'Unsuccessful or inactive partnership enquiries are deleted six months after the last substantive communication, unless there is a documented reason to keep them longer. Information for an active partnership follows the retention arrangements for partner and contract records.',
                'Expired technical rate-limit records are cleaned up when a later enquiry is processed.',
            ],
        },
        {
            title: '6. Hosting, service providers and international transfers',
            paragraphs: [
                'When you visit the website, essential connection and server data may be processed, such as IP address, time, requested page, browser and device information. Depending on the live setup, Cloudflare may provide website runtime and hosting, Supabase may provide database and image storage, and Resend may provide optional email notifications.',
                'No additional CRM service is configured in the website code. If UCV uses a CRM outside this website, it will be added here.',
            ],
        },
        {
            title: '7. Gallery, cookies and external content',
            paragraphs: [
                'The gallery may display approved food, restaurant and location photographs and, where applicable, identifiable people. UCV will only publish images where it has the necessary permission or other lawful basis. Privacy questions or image-removal requests can be sent to the email above.',
                'The current website code has no analytics or advertising trackers such as Google Analytics or Meta Pixel. Fonts and local website images are served by the website. The administrator area may use technically necessary session or interface storage. An external WhatsApp service opens only if you choose the WhatsApp link.',
            ],
        },
        {
            title: '8. Your privacy rights',
            paragraphs: [
                'Subject to legal requirements, you may request access, correction, deletion, restriction of processing and data portability. You may object to processing based on legitimate interests. You may withdraw consent for future processing where processing is based on consent; this does not affect processing that was lawful before withdrawal.',
                `For privacy requests, email ${contact.email}. You may also complain to the Berlin Commissioner for Data Protection and Freedom of Information: Alt-Moabit 59-61, 10555 Berlin, Germany. Information: https://www.datenschutz-berlin.de.`,
            ],
        },
        {
            title: '9. Providing information and automated decisions',
            paragraphs: [
                'Using the enquiry form is voluntary. Without the required details, we may be unable to handle your enquiry. The current website process does not make decisions solely by automated means that have legal or similarly significant effects.',
            ],
        },
        {
            title: '10. Changes to this notice',
            paragraphs: ['This notice will be updated if the form, service providers, retention periods or recipients change.'],
        },
    ];

    return <article className="legal legal-page privacy-page" data-reveal>
        <span className="eyebrow">UCV / PRIVACY</span>
        <h1>{de ? 'Datenschutzerklärung' : 'Privacy Policy'}</h1>
        <p className="legal-intro">{de
            ? 'Hier erklären wir, welche personenbezogenen Daten bei einem Websitebesuch und einer Partnerschaftsanfrage verarbeitet werden, wofür sie verwendet werden und welche Rechte du hast.'
            : 'This notice explains what personal data is processed when you visit this website or submit a partnership enquiry, why it is used and what rights you have.'}</p>
        <div className="privacy-sections">{sections.map(section => <section className="legal-block" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}</div>
    </article>;
}