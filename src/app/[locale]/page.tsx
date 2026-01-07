"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import LDBiroLogo from "../../components/LDBiroLogo";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { FormValues, contactValidationSchema } from "../../contact/validation";
import { useTranslations } from "../../i18n";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const t = useTranslations();

  // Submit message state
  const [submitMessage, setSubmitMessage] = useState("");

  // Form submit handler
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message || t.contact.messages.success);
        resetForm();
      } else {
        setSubmitMessage(result.error || t.contact.messages.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage(t.contact.messages.error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer to detect which section is under the header
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px", // Account for header height
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Light sections: services, about, contact
          // Dark sections: hero (no id), footer
          const lightSections = ["services", "about", "contact"];
          setIsOverLightSection(lightSections.includes(sectionId));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all main sections
    const sections = document.querySelectorAll("section[id], .hero-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Business type options with keys for translation
  const businessTypeOptions = [
    {
      key: "entrepreneur",
      value: t.contact.form.businessType.options.entrepreneur,
    },
    { key: "llc", value: t.contact.form.businessType.options.llc },
    { key: "jsc", value: t.contact.form.businessType.options.jsc },
    { key: "farm", value: t.contact.form.businessType.options.farm },
    {
      key: "partnership",
      value: t.contact.form.businessType.options.partnership,
    },
    {
      key: "limitedPartnership",
      value: t.contact.form.businessType.options.limitedPartnership,
    },
    {
      key: "cooperative",
      value: t.contact.form.businessType.options.cooperative,
    },
    {
      key: "publicEnterprise",
      value: t.contact.form.businessType.options.publicEnterprise,
    },
    {
      key: "institution",
      value: t.contact.form.businessType.options.institution,
    },
    { key: "other", value: t.contact.form.businessType.options.other },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          isOverLightSection
            ? "bg-slate-100/95 backdrop-blur-md border-slate-300/50 shadow-lg"
            : "bg-white/90 backdrop-blur-md border-white/40 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a
                href="#"
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <LDBiroLogo
                  width={40}
                  height={40}
                  className={`mr-3 transition-colors duration-300 ${
                    isOverLightSection ? "text-slate-900" : "text-slate-900"
                  }`}
                />
                <div className="flex flex-col">
                  <h1
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isOverLightSection ? "text-slate-900" : "text-slate-900"
                    }`}
                  >
                    {t.common.companyName}
                  </h1>
                  <span
                    className={`text-xs transition-colors duration-300 ${
                      isOverLightSection ? "text-slate-600" : "text-slate-700"
                    }`}
                  >
                    {t.common.tagline}
                  </span>
                </div>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className={`transition-colors duration-300 focus:outline-none ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {t.nav.services}
              </a>
              <a
                href="#about"
                className={`transition-colors duration-300 focus:outline-none ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {t.nav.about}
              </a>
              <a
                href="#contact"
                className={`transition-colors duration-300 focus:outline-none ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {t.nav.contact}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors focus:outline-none"
              >
                {t.nav.startCooperation}
              </a>
              <LanguageSwitcher
                className={
                  isOverLightSection ? "text-slate-700" : "text-slate-800"
                }
              />
            </div>
          </div>
        </div>
      </nav>

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
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30+</div>
              <div className="text-blue-200">{t.stats.yearsExperience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30+</div>
              <div className="text-blue-200">{t.stats.agriculturalFarms}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-200">{t.stats.satisfiedClients}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">{t.stats.support}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t.services.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => {
              const icons = [
                "📊",
                "📚",
                "🌾",
                "💼",
                "💰",
                "🏢",
                "🔍",
                "📄",
                "📈",
              ];
              return (
                <div
                  key={index}
                  id={`service-${index}`}
                  className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group hover:bg-blue-50 scroll-mt-24"
                >
                  <div className="text-4xl mb-4">{icons[index]}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-800">
                    {service.title}
                  </h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-slate-600">{t.contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                {t.contact.info.title}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {t.contact.info.address.label}
                    </h4>
                    <p className="text-slate-600">
                      {t.contact.info.address.line1}
                      <br />
                      {t.contact.info.address.line2}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {t.contact.info.phone.label}
                    </h4>
                    <p className="text-slate-600">
                      {t.contact.info.phone.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">✉️</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {t.contact.info.email.label}
                    </h4>
                    <p className="text-slate-600">
                      {t.contact.info.email.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">⏰</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {t.contact.info.workingHours.label}
                    </h4>
                    <p className="text-slate-600">
                      {t.contact.info.workingHours.weekdays}
                      <br />
                      {t.contact.info.workingHours.saturday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                {t.contact.form.title}
              </h3>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  businessType: "",
                  message: "",
                }}
                validationSchema={contactValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.contact.form.name}
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.contact.form.email}
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.contact.form.businessType.label}
                      </label>
                      <Field
                        as="select"
                        name="businessType"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">
                          {t.contact.form.businessType.placeholder}
                        </option>
                        {businessTypeOptions.map((option) => (
                          <option key={option.key} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="businessType"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.contact.form.message}
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t.contact.form.messagePlaceholder}
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    {submitMessage && (
                      <div
                        className={`p-4 rounded-lg ${
                          submitMessage === t.contact.messages.success
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isSubmitting
                        ? t.contact.form.submitting
                        : t.contact.form.submit}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-200 text-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <LDBiroLogo width={32} height={32} className="mr-3" />
                <h3 className="text-2xl font-bold">{t.common.companyName}</h3>
              </div>
              <p className="text-slate-600 mb-4">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t.footer.basicServices}
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#service-0"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.taxPlanning}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-1"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.completeBookkeeping}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-2"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.agriculturalFarms}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-3"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.financialConsulting}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-4"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.payroll}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t.footer.additionalServices}
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#service-5"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.companyFormation}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-6"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.audit}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-7"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.vatTax}
                  </a>
                </li>
                <li>
                  <a
                    href="#service-8"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks.financialReports}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t.footer.navigation}
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#services"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-300 mt-8 pt-8 text-center text-slate-500">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
