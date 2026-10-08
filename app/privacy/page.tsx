import type { Metadata } from 'next';
import LegalRoute from '../../src/components/LegalRoute';

export const metadata: Metadata = { title: 'Datenschutzerklärung | Urban Culinary Venture' };
export default function PrivacyPage() { return <LegalRoute lang="de" page="privacy" />; }
