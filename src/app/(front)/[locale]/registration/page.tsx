

import RegistrationForm from './form';
import { loadLocale } from '@/lib/loadLocale';

interface RegistrationPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RegistrationPage({ params }: RegistrationPageProps) {
  const { locale } = await params;
  const registrationJson = loadLocale(locale, 'registration');
  const common = loadLocale(locale, 'common');

  return (
      <div className="content grid  grid-cols-1 sm:grid-cols-1  md:grid-cols-6">
        <div className="
        registration-page
        col-span-1 sm:col-span-1  md:col-span-4
        col-start-1 sm:col-start-1 md:col-start-2
        mt-0 sm:mt-4 md:mt-4
        panel  px-6 py-6"><RegistrationForm regisjson={registrationJson} common={common} locale={locale} /></div>
      </div>
  );
}
