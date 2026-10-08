import { ContentProvider } from '../content/ContentProvider';
import { Lang, pick } from '../content/site';
import { publicContent } from '../../lib/cms-db';
import Header from './Header';
import Footer from './Footer';
import PartnerProvider from './PartnerProvider';
import FloatingControls from './FloatingControls';
import SiteMotion from './SiteMotion';
import Impressum from '../views/impressum';
import Privacy from '../views/privacy';

export default async function LegalRoute({ lang, page }: { lang: Lang; page: 'impressum' | 'privacy' }) {
    const content = await publicContent();
    const title = page === 'privacy'
        ? (lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy')
        : (lang === 'de' ? 'Impressum' : 'Imprint');
    const LegalPage = page === 'privacy' ? Privacy : Impressum;

    return <ContentProvider content={content}>
        <PartnerProvider l={lang}>
            <SiteMotion />
            <FloatingControls l={lang} />
            <a className="skip" href="#main">{pick(lang, 'Zum Inhalt', 'Skip to content')}</a>
            <div className="site">
                <Header l={lang} path={page} />
                <main id="main" aria-label={title}><LegalPage l={lang} /></main>
                <Footer l={lang} />
            </div>
        </PartnerProvider>
    </ContentProvider>;
}
