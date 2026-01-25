import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations, Locale } from "../i18n";
import MetaData from "../components/MetaData";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import {
  Section,
  SectionHeader,
  StatCard,
  ServiceCard,
  ContactInfoItem,
} from "../components/ui";
import {
  COMPANY_STATS,
  SERVICE_ICONS,
  CONTACT_ICONS,
  LIGHT_SECTIONS,
} from "../lib/constants";

export default function Home() {
  const router = useRouter();
  const locale = (router.locale || "sr") as Locale;

  const [isVisible, setIsVisible] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer to detect which section is under the header
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setIsOverLightSection(
            LIGHT_SECTIONS.includes(
              sectionId as (typeof LIGHT_SECTIONS)[number]
            )
          );
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll("section[id], .hero-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MetaData locale={locale} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Navigation */}
        <Navigation isOverLightSection={isOverLightSection} translations={t} />

        {/* Hero Section */}
        <section className="hero-section pt-32 pb-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div
              className={`text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-relaxed">
                {t.hero.title}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block mt-2 pb-2">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                >
                  {t.hero.scheduleConsultation}
                </a>
                <a
                  href="#about"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full text-lg font-semibold transition-all"
                >
                  {t.hero.learnMore}
                </a>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <StatCard
                value={COMPANY_STATS.yearsExperience}
                label={t.stats.yearsExperience}
              />
              <StatCard
                value={COMPANY_STATS.agriculturalFarms}
                label={t.stats.agriculturalFarms}
              />
              <StatCard
                value={COMPANY_STATS.satisfiedClients}
                label={t.stats.satisfiedClients}
              />
              <StatCard value={COMPANY_STATS.support} label={t.stats.support} />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Section id="services" className="bg-white">
          <SectionHeader
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <ServiceCard
                key={index}
                id={`service-${index}`}
                icon={SERVICE_ICONS[index]}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className="bg-slate-50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {t.about.paragraph1}
              </p>
              <p className="text-lg text-slate-600 mb-8">
                {t.about.paragraph2}
              </p>
              <div className="space-y-4">
                {t.about.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">
                {t.about.whyChoose.title}
              </h3>
              <div className="space-y-6">
                {t.about.whyChoose.items.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-blue-100">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="bg-white">
          <SectionHeader
            title={t.contact.title}
            subtitle={t.contact.subtitle}
          />
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                {t.contact.info.title}
              </h3>
              <div className="space-y-6">
                <ContactInfoItem
                  icon={CONTACT_ICONS.address}
                  label={t.contact.info.address.label}
                >
                  <p>
                    {t.contact.info.address.line1}
                    <br />
                    {t.contact.info.address.line2}
                  </p>
                </ContactInfoItem>

                <ContactInfoItem
                  icon={CONTACT_ICONS.phone}
                  label={t.contact.info.phone.label}
                >
                  <p>
                    {t.contact.info.phone.value}
                    <br />
                    {t.contact.info.phone.value2}
                  </p>
                </ContactInfoItem>

                <ContactInfoItem
                  icon={CONTACT_ICONS.email}
                  label={t.contact.info.email.label}
                >
                  <p>{t.contact.info.email.value}</p>
                </ContactInfoItem>

                <ContactInfoItem
                  icon={CONTACT_ICONS.workingHours}
                  label={t.contact.info.workingHours.label}
                >
                  <p>
                    {t.contact.info.workingHours.weekdays}
                    <br />
                    {t.contact.info.workingHours.saturday}
                  </p>
                </ContactInfoItem>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm translations={t.contact} />
          </div>
        </Section>

        {/* Footer */}
        <Footer translations={t} />
      </div>
    </>
  );
}
