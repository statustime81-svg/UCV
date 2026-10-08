import type { Metadata } from 'next';
import LegalRoute from '../../src/components/LegalRoute';

export const metadata: Metadata = { title: 'Impressum | Urban Culinary Venture' };
export default function ImpressumPage() { return <LegalRoute lang="de" page="impressum" />; }
