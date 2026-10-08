import type { Metadata } from 'next';
import LegalRoute from '../../../src/components/LegalRoute';

export const metadata: Metadata = { title: 'Privacy Policy | Urban Culinary Venture' };
export default function EnglishPrivacyPage() { return <LegalRoute lang="en" page="privacy" />; }
