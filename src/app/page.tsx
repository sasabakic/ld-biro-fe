"use client";

import { useState, useEffect } from "react";
import LDBiroLogo from "../components/LDBiroLogo";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Form handlers
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(
          result.message ||
            "Poruka je uspešno poslana! Kontaktiraćemo vas uskoro."
        );
        setFormData({
          name: "",
          email: "",
          businessType: "",
          message: "",
        });
      } else {
        setSubmitMessage(
          result.error || "Greška pri slanju poruke. Molimo pokušajte ponovo."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Greška pri slanju poruke. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
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
                    LD Biro
                  </h1>
                  <span
                    className={`text-xs transition-colors duration-300 ${
                      isOverLightSection ? "text-slate-600" : "text-slate-700"
                    }`}
                  >
                    Knjigovodstvo & Finansije
                  </span>
                </div>
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#services"
                className={`transition-colors duration-300 ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Usluge
              </a>
              <a
                href="#about"
                className={`transition-colors duration-300 ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                O nama
              </a>
              <a
                href="#contact"
                className={`transition-colors duration-300 ${
                  isOverLightSection
                    ? "text-slate-700 hover:text-blue-600"
                    : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Kontakt
              </a>
            </div>
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Započni saradnju
            </a>
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
              Vaš pouzdan partner za
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block mt-2 pb-2">
                Knjigovodstvo
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              LD Biro pruža stručne usluge knjigovodstva, poresko planiranje i
              finansijsko savetovanje. Specijalizovani smo za poljoprivredna
              gazdinstva i MSP preduzetnike koji traže pouzdanog partnera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
              >
                Zakaži konsultacije
              </a>
              <a
                href="#about"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                Saznaj više
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
              <div className="text-blue-200">Godina iskustva tima</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-200">Poljoprivrednih gazdinstava</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-200">Zadovoljnih klijenata</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">Podrška</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Naše usluge
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kompletna rešenja za knjigovodstvo i finansije, prilagođena
              potrebama vašeg biznisa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Poresko planiranje i priprema",
                description:
                  "Strateško poresko planiranje i precizna priprema da minimizujemo vaše poreske obaveze uz punu usklađenost sa propisima.",
                icon: "📊",
              },
              {
                title: "Kompletno knjigovodstvo",
                description:
                  "Sveobuhvatne usluge knjigovodstva za održavanje tačnih i ažurnih finansijskih evidencija vašeg preduzeća.",
                icon: "📚",
              },
              {
                title: "Poljoprivredna gazdinstva",
                description:
                  "Specijalizovani smo za knjigovodstvo poljoprivrednih gazdinstava - subvencije, podsticaji, specifični propisi.",
                icon: "🌾",
              },
              {
                title: "Finansijsko savetovanje",
                description:
                  "Stručni finansijski saveti koji vam pomažu da donosite informisane odluke i razvijate svoj biznis.",
                icon: "💼",
              },
              {
                title: "Obračun zarada",
                description:
                  "Kompletno procesiranje plata, poreskih obustava i upravljanje usklađenošću sa radnim zakonodavstvom.",
                icon: "💰",
              },
              {
                title: "Osnivanje preduzeća",
                description:
                  "Pomoć pri izboru organizacione strukture, registraciji i uspostavljanju sistema usklađenosti.",
                icon: "🏢",
              },
              {
                title: "Revizija i verifikacija",
                description:
                  "Profesionalne usluge revizije koje osiguravaju tačnost i usklađenost sa propisima.",
                icon: "🔍",
              },
              {
                title: "PDV i poreske prijave",
                description:
                  "Priprema i podnošenje svih vrsta poreskih prijava, uključujući PDV, porez na dobit i lični dohodak.",
                icon: "📄",
              },
              {
                title: "Finansijski izvještaji",
                description:
                  "Kreiranje detaljnih finansijskih izvještaja koji pružaju uvid u zdravlje vašeg biznisa.",
                icon: "📈",
              },
            ].map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group hover:bg-blue-50 scroll-mt-24"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-800">
                  {service.title}
                </h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                O LD Biro
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                LD Biro je osnovan 2021. godine sa jasnom vizijom - pružanje
                vrhunskih usluga knjigovodstva baziranih na decenijskom
                iskustvu. Naši senior knjigovođe imaju preko 30 godina
                praktičnog iskustva u struci, što garantuje neprocenjivo znanje
                i stručnost.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Iako smo mlada kompanija, naš tim sertifikovanih stručnjaka
                kombinuje tradicionalno knjigovodstveno znanje sa modernim
                tehnologijama kako bi pružio efikasna, tačna i sveobuhvatna
                finansijska rešenja. Posebno smo ponosni na naše dugogodišnje
                partnerstvo sa poljoprivrednim gazdinstvima koje naši stručnjaci
                neguju decenijama.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Senior knjigovođe sa 30+ godina iskustva
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Moderna kompanija osnovana 2021. godine
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Specijalizacija za poljoprivredu
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Napredna tehnološka rešenja
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">
                    Personalizovana usluga za klijente
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">
                Zašto izabrati LD Biro?
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Specijalizacija za poljoprivredu
                  </h4>
                  <p className="text-blue-100">
                    Duboko poznavanje specifičnosti poljoprivrednih gazdinstava,
                    subvencija i podsticaja.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    30+ godina iskustva u struci
                  </h4>
                  <p className="text-blue-100">
                    Naši senior stručnjaci kombinuju tri decenije praktičnog
                    iskustva sa modernim pristupom.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Najsavremenija tehnologija
                  </h4>
                  <p className="text-blue-100">
                    Moderni alati i softver za tačnu i efikasnu uslugu.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Personalizovan pristup
                  </h4>
                  <p className="text-blue-100">
                    Rešenja po meri koja odgovaraju jedinstvenim potrebama vašeg
                    biznisa.
                  </p>
                </div>
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
              Stupite u kontakt
            </h2>
            <p className="text-xl text-slate-600">
              Spremni da preuzmete kontrolu nad svojim finansijama?
              Kontaktirajte nas danas za konsultacije.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Kontakt informacije
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Adresa</h4>
                    <p className="text-slate-600">
                      Rade Končara 10
                      <br />
                      25000 Sombor
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Telefon</h4>
                    <p className="text-slate-600">025/123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">✉️</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="text-slate-600">info@ldbiro.rs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">⏰</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Radno vreme
                    </h4>
                    <p className="text-slate-600">
                      Ponedeljak - Petak: 09:00 - 18:00
                      <br />
                      Subota: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                Pošaljite nam poruku
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ime i prezime
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tip biznisa
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Izaberite tip biznisa</option>
                    <option value="Preduzetnik">Preduzetnik</option>
                    <option value="Društvo sa ograničenom odgovornošću (d.o.o.)">
                      Društvo sa ograničenom odgovornošću (d.o.o.)
                    </option>
                    <option value="Akcionarsko društvo (a.d.)">
                      Akcionarsko društvo (a.d.)
                    </option>
                    <option value="Poljoprivredno gazdinstvo">
                      Poljoprivredno gazdinstvo
                    </option>
                    <option value="Ortačko društvo">Ortačko društvo</option>
                    <option value="Komanditno društvo">
                      Komanditno društvo
                    </option>
                    <option value="Zadruga">Zadruga</option>
                    <option value="Javno preduzeće">Javno preduzeće</option>
                    <option value="Ustanova">Ustanova</option>
                    <option value="Ostalo">Ostalo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Poruka
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Opišite vaše potrebe za knjigovodstvenim uslugama..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes("uspešno")
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
                  {isSubmitting ? "Šalje se..." : "Pošaljite poruku"}
                </button>
              </form>
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
                <h3 className="text-2xl font-bold">LD Biro</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Vaš pouzdani partner za sveobuhvatne usluge knjigovodstva i
                finansija. Pomažemo preduzećima i poljoprivrednim gazdinstvima
                da napreduju kroz stručno finansijsko vođenje.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Osnovne usluge</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#service-0"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Poresko planiranje
                  </a>
                </li>
                <li>
                  <a
                    href="#service-1"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Kompletno knjigovodstvo
                  </a>
                </li>
                <li>
                  <a
                    href="#service-2"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Poljoprivredna gazdinstva
                  </a>
                </li>
                <li>
                  <a
                    href="#service-3"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Finansijsko savetovanje
                  </a>
                </li>
                <li>
                  <a
                    href="#service-4"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Obračun zarada
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Dodatne usluge</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#service-5"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Osnivanje preduzeća
                  </a>
                </li>
                <li>
                  <a
                    href="#service-6"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Revizija i verifikacija
                  </a>
                </li>
                <li>
                  <a
                    href="#service-7"
                    className="hover:text-slate-800 transition-colors"
                  >
                    PDV i poreske prijave
                  </a>
                </li>
                <li>
                  <a
                    href="#service-8"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Finansijski izvještaji
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigacija</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <a
                    href="#services"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Usluge
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-slate-800 transition-colors"
                  >
                    O nama
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-slate-800 transition-colors"
                  >
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-300 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2024 LD Biro. Sva prava zadržana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
