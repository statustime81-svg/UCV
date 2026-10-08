"use client";

import { useContent } from '../../content/ContentProvider';
import { Lang } from '../../content/site';

const operator = {
    person: 'Anmol Kumar',
    business: 'Urban Culinary Venture (UCV)',
    form: 'Einzelunternehmen',
    addressDe: 'Baldersheimer Weg 28, 12349 Berlin, Deutschland',
    addressEn: 'Baldersheimer Weg 28, 12349 Berlin, Germany',
};

export default function Impressum({ l }: { l: Lang }) {
    const { contact } = useContent();
    const de = l === 'de';

    return <article className="legal legal-page" data-reveal>
        <span className="eyebrow">UCV / LEGAL</span>
        <h1>{de ? 'Impressum' : 'Imprint'}</h1>
        <p className="legal-intro">{de
            ? 'Angaben zum Anbieter dieser Website und zum Unternehmen hinter Urban Culinary Venture.'
            : 'Information about the provider of this website and the business behind Urban Culinary Venture.'}</p>

        <section className="legal-block">
            <h2>{de ? 'Anbieter' : 'Website provider'}</h2>
            <address>
                <strong>{operator.person}</strong><br />
                {de ? 'handelnd unter' : 'trading as'} {operator.business}<br />
                {operator.form}<br />
                {de ? operator.addressDe : operator.addressEn}
            </address>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Vertretungsberechtigte Person' : 'Authorised representative'}</h2>
            <p>{operator.person} · {de ? 'Inhaber' : 'Proprietor'}</p>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Kontakt' : 'Contact'}</h2>
            <dl className="legal-facts">
                <div><dt>{de ? 'E-Mail' : 'Email'}</dt><dd><a href={'mailto:' + contact.email}>{contact.email}</a></dd></div>
                <div><dt>{de ? 'Telefon / Partnerschaftsanfragen' : 'Phone / partnership enquiries'}</dt><dd><a href={'tel:' + contact.phone.replace(/[^+\d]/g, '')}>{contact.phone}</a></dd></div>
            </dl>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Register- und Umsatzsteuerangaben' : 'Register and VAT details'}</h2>
            <p>{de
                ? 'UCV wird als Einzelunternehmen betrieben. Ein Handelsregistereintrag besteht nicht. Eine Umsatzsteuer-Identifikationsnummer wird separat mitgeteilt, sofern eine vergeben wurde. Eine persönliche Steuer-ID oder Steuernummer wird hier nicht veröffentlicht.'
                : 'UCV operates as a sole proprietorship. No commercial-register entry exists. A VAT identification number is provided separately if one has been assigned. No personal tax ID or tax number is published here.'}</p>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Verantwortlich für den Inhalt' : 'Responsible for website content'}</h2>
            <address>
                {operator.person}<br />
                {de ? operator.addressDe : operator.addressEn}
            </address>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Geschäftstätigkeit und Marken' : 'Business activity and brands'}</h2>
            <p>{de
                ? 'UCV arbeitet mit bestehenden Restaurants zusammen, die ausgewählte Liefermarken aus geeigneten eigenen Küchen betreiben. UCV unterstützt mit Marken- und Menüentwicklung, Preisgestaltung, Lieferplattform-Onboarding und -Management, Marketing, Verpackungsleitlinien, Mitarbeiterschulungen und laufender operativer Unterstützung. Die Restaurantpartner bereiten die Speisen zu.'
                : 'UCV partners with existing restaurants that operate selected delivery-focused brands from suitable kitchens of their own. UCV supports brand and menu development, pricing guidance, delivery-platform onboarding and management, marketing, packaging guidance, staff training and ongoing operations. Restaurant partners prepare the food.'}</p>
            <ul>
                <li><strong>Fry Rebels:</strong> {de ? 'Chicken-Burger, frittiertes Hähnchen, Wings, Tenders, Pommes und Loaded Fries.' : 'Chicken burgers, fried chicken, wings, tenders, fries and loaded fries.'}</li>
                <li><strong>Fresh Crust Pizza:</strong> {de ? 'Pizza und Pasta.' : 'Pizza and pasta.'}</li>
            </ul>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Verbraucherstreitbeilegung' : 'Consumer dispute resolution'}</h2>
            <p>{de
                ? 'Diese Website dient Unternehmensinformationen und Partnerschaftsanfragen von Restaurantbetreibern. Über diese Website werden keine Verbraucher-Food-Bestellungen oder Zahlungen angenommen. Es besteht keine Verpflichtung und keine Bereitschaft, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'This website provides company information and receives partnership enquiries from restaurant operators. It does not accept consumer food orders or payments. There is no obligation or willingness to participate in dispute-resolution proceedings before a consumer arbitration board.'}</p>
        </section>

        <section className="legal-block">
            <h2>{de ? 'Inhalte und externe Links' : 'Content and external links'}</h2>
            <p>{de
                ? 'Diese Website informiert über UCV, seine Food-Marken und Partnerschaften mit bestehenden Restaurants. Für Inhalte externer Websites sind deren jeweilige Anbieter verantwortlich. Hinweise zu konkreten fehlerhaften Inhalten können an die oben genannte E-Mail-Adresse gesendet werden.'
                : 'This website provides information about UCV, its food brands and partnerships with existing restaurants. The operators of external websites are responsible for their content. Reports about specific incorrect content may be sent to the email address above.'}</p>
        </section>
    </article>;
}