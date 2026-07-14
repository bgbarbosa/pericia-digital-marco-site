import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import {
  CredentialsSection,
  DigitalForensicsSection,
  SpecializationSection,
  TrajectorySection,
} from "@/components/ProfessionalSections";
import {
  credentials,
  emailUrl,
  emphasisPoints,
  homeMenu,
  profile,
  specializationAreas,
  telephoneUrl,
  whatsappUrl,
} from "@/data/profile";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#020817] text-slate-100 selection:bg-cyan-400/20">
      <Header menu={homeMenu} brandHref="#inicio" contactHref="#contato" />
      <HeroSection profile={profile} />
      <DigitalForensicsSection />
      <SpecializationSection areas={specializationAreas} />
      <TrajectorySection profile={profile} />
      <CredentialsSection
        credentials={credentials}
        emphasisPoints={emphasisPoints}
        profile={profile}
      />
      <ContactSection
        emailUrl={emailUrl}
        profile={profile}
        telephoneUrl={telephoneUrl}
        whatsappUrl={whatsappUrl}
      />
      <Footer />
    </main>
  );
}
