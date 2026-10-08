import type { Metadata } from 'next';
import LegalRoute from '../../../src/components/LegalRoute';

export const metadata: Metadata = { title: 'Imprint | Urban Culinary Venture' };
export default function EnglishImpressumPage() { return <LegalRoute lang="en" page="impressum" />; }
