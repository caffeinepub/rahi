import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/assets/uploads/slide1-dental-1-019d2ef9-bea0-73f8-ad17-105a93591650-1.jpg",
  "/assets/uploads/slide2-smile-1-019d2ef9-bf11-756b-8f23-de41452cd1ca-2.jpg",
  "/assets/uploads/dermatologist-019d2ef9-bf2e-72bf-8ee4-e1ed5456e29c-3.jpg",
  "/assets/uploads/patient-man-019d2ef9-bfc5-76fa-98d5-7abc9215266e-4.jpg",
  "/assets/uploads/patient-woman-1-019d2ef9-c127-732e-bcf9-a2cbef653fc4-5.jpg",
];

const PRODUCTS = [
  {
    id: 1,
    name: "The Silence Dress",
    description: "Hand-woven linen, bias cut",
    price: "$890",
    image: IMAGES[0],
  },
  {
    id: 2,
    name: "Strata Coat",
    description: "Double-faced wool, structured",
    price: "$1,240",
    image: IMAGES[1],
  },
  {
    id: 3,
    name: "The Void Shirt",
    description: "Japanese cotton voile, oversized",
    price: "$380",
    image: IMAGES[2],
  },
  {
    id: 4,
    name: "Form Trouser",
    description: "Pressed wool, wide leg",
    price: "$620",
    image: IMAGES[3],
  },
];

function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      data-ocid="nav.link"
      className="font-sans-ui text-rahi-black hover:text-rahi-gray transition-colors duration-200"
      style={{ fontSize: "10px", letterSpacing: "0.2em", fontWeight: 400 }}
    >
      {children}
    </button>
  );
}

function setImageScale(e: React.MouseEvent<HTMLImageElement>, scale: string) {
  (e.currentTarget as HTMLImageElement).style.transform = `scale(${scale})`;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setEmailSubmitted(true);
    }
  };

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <div className="min-h-screen bg-rahi-cream text-rahi-black">
      {/* ── STICKY HEADER ── */}
      <header
        data-ocid="nav.panel"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "oklch(0.955 0.009 75 / 0.97)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid oklch(0.87 0.009 75)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-5">
          <div className="text-center mb-3">
            <button
              type="button"
              data-ocid="nav.link"
              className="font-display text-rahi-black"
              style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              RAHI
            </button>
          </div>
          <nav className="flex justify-center items-center gap-0">
            {["NEW ARRIVALS", "COLLECTIONS", "THE EDIT", "ABOUT", "STORES"].map(
              (item, i) => (
                <span key={item} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="text-rahi-gray mx-3"
                      style={{ fontSize: "9px" }}
                    >
                      /
                    </span>
                  )}
                  <NavLink>{item}</NavLink>
                </span>
              ),
            )}
            <span className="text-rahi-gray mx-3" style={{ fontSize: "9px" }}>
              /
            </span>
            <button
              type="button"
              data-ocid="nav.button"
              className="font-sans-ui text-rahi-black hover:text-rahi-gray transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 400,
              }}
            >
              SEARCH
            </button>
            <span className="text-rahi-gray mx-3" style={{ fontSize: "9px" }}>
              /
            </span>
            <button
              type="button"
              data-ocid="nav.button"
              className="font-sans-ui text-rahi-black hover:text-rahi-gray transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 400,
              }}
            >
              BAG (0)
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── HERO SECTION ── */}
        <section
          data-ocid="hero.section"
          className="pt-40 pb-12 text-center max-w-[1400px] mx-auto px-8"
        >
          <FadeInSection delay={0.1}>
            <p
              className="font-sans-ui text-rahi-gray mb-6"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                fontWeight: 400,
              }}
            >
              SS26 COLLECTION
            </p>
          </FadeInSection>
          <FadeInSection delay={0.25}>
            <h1
              className="font-display text-rahi-black"
              style={{
                fontSize: "clamp(56px, 10vw, 120px)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                lineHeight: 0.95,
                marginBottom: "1.5rem",
              }}
            >
              THE DESERT
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>SONATA</em>
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <p
              className="font-sans-ui text-rahi-gray"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                fontWeight: 400,
              }}
            >
              RAHI — VOLUME III
            </p>
          </FadeInSection>
        </section>

        {/* ── EDITORIAL SECTION ── */}
        <section
          data-ocid="editorial.section"
          className="max-w-[1400px] mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          <FadeInSection delay={0}>
            <div>
              <p
                className="font-sans-ui text-rahi-gray mb-8"
                style={{ fontSize: "10px", letterSpacing: "0.25em" }}
              >
                THE EDIT — SS26
              </p>
              <p
                className="font-display text-rahi-black leading-snug mb-10"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 34px)",
                  fontWeight: 300,
                  lineHeight: 1.35,
                }}
              >
                Silence speaks in textures.
                <br />
                In the weight of hand-woven linen
                <br />
                against skin. In the way a coat
                <br />
                falls — not draped, but decided.
                <br />
                <br />
                This is a collection about restraint.
                <br />
                About the courage of absence.
              </p>
              <button
                type="button"
                data-ocid="editorial.button"
                className="font-sans-ui text-rahi-black border border-rahi-black px-8 py-3 hover:bg-rahi-black hover:text-rahi-cream transition-colors duration-300"
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                DISCOVER THE EDIT
              </button>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={IMAGES[4]}
                alt="Editorial fashion — wide angle"
                className="w-full h-full object-cover"
                style={{
                  transition: "transform 0.6s ease",
                  transformOrigin: "center",
                }}
                onMouseEnter={(e) => setImageScale(e, "1.03")}
                onMouseLeave={(e) => setImageScale(e, "1")}
              />
            </div>
          </FadeInSection>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="w-full h-px bg-rahi-divider" />
        </div>

        {/* ── PRODUCT GRID ── */}
        <section
          data-ocid="products.section"
          className="max-w-[1400px] mx-auto px-8 py-32"
        >
          <FadeInSection>
            <div className="flex justify-between items-baseline mb-16">
              <h2
                className="font-display text-rahi-black"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 300,
                }}
              >
                New Arrivals
              </h2>
              <button
                type="button"
                data-ocid="products.button"
                className="font-sans-ui text-rahi-gray hover:text-rahi-black transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                VIEW ALL
              </button>
            </div>
          </FadeInSection>
          <div
            data-ocid="products.list"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {PRODUCTS.map((product, i) => (
              <FadeInSection key={product.id} delay={i * 0.1}>
                <article
                  data-ocid={`products.item.${i + 1}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p
                      className="font-sans-ui text-rahi-black mb-1"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        fontWeight: 500,
                      }}
                    >
                      {product.name.toUpperCase()}
                    </p>
                    <p
                      className="font-sans-ui text-rahi-gray mb-2"
                      style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                    >
                      {product.description}
                    </p>
                    <p
                      className="font-sans-ui text-rahi-black"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.05em",
                        fontWeight: 400,
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* ── PROMO PANELS ── */}
        <section
          data-ocid="promo.section"
          className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FadeInSection delay={0}>
            <div
              data-ocid="promo.card"
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={IMAGES[2]}
                alt="The Luna Coat"
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.7s ease" }}
                onMouseEnter={(e) => setImageScale(e, "1.03")}
                onMouseLeave={(e) => setImageScale(e, "1")}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <p
                  className="font-sans-ui text-white/70 mb-2"
                  style={{ fontSize: "9px", letterSpacing: "0.25em" }}
                >
                  NOW AVAILABLE
                </p>
                <h3
                  className="font-display text-white mb-4"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 300,
                  }}
                >
                  The Luna Coat
                </h3>
                <button
                  type="button"
                  data-ocid="promo.button"
                  className="font-sans-ui text-white border border-white/60 px-6 py-2 hover:bg-white hover:text-rahi-black transition-colors duration-300"
                  style={{ fontSize: "9px", letterSpacing: "0.2em" }}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div
              data-ocid="promo.card"
              className="relative overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={IMAGES[3]}
                alt="Journal — The Edit"
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.7s ease" }}
                onMouseEnter={(e) => setImageScale(e, "1.03")}
                onMouseLeave={(e) => setImageScale(e, "1")}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <p
                  className="font-sans-ui text-white/70 mb-2"
                  style={{ fontSize: "9px", letterSpacing: "0.25em" }}
                >
                  JOURNAL
                </p>
                <h3
                  className="font-display text-white mb-4"
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 300,
                  }}
                >
                  The Edit
                </h3>
                <button
                  type="button"
                  data-ocid="promo.button"
                  className="font-sans-ui text-white border border-white/60 px-6 py-2 hover:bg-white hover:text-rahi-black transition-colors duration-300"
                  style={{ fontSize: "9px", letterSpacing: "0.2em" }}
                >
                  READ MORE
                </button>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        data-ocid="footer.section"
        className="bg-rahi-footer text-rahi-footer-text"
      >
        <div className="max-w-[1400px] mx-auto px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h2
                className="font-display text-rahi-footer-text mb-6"
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                RAHI
              </h2>
              <p
                className="font-sans-ui text-rahi-footer-text/50"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  lineHeight: 1.8,
                }}
              >
                Silence speaks in textures.
                <br />
                Quiet luxury, worn daily.
              </p>
            </div>

            <div>
              <p
                className="font-sans-ui text-rahi-footer-text/50 mb-5"
                style={{ fontSize: "9px", letterSpacing: "0.25em" }}
              >
                COLLECTIONS
              </p>
              {[
                "SS26 Desert Sonata",
                "AW25 Archive",
                "The Essentials",
                "Limited Editions",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  data-ocid="footer.link"
                  className="block w-full text-left font-sans-ui text-rahi-footer-text/70 hover:text-rahi-footer-text transition-colors mb-3"
                  style={{ fontSize: "11px", letterSpacing: "0.05em" }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div>
              <p
                className="font-sans-ui text-rahi-footer-text/50 mb-5"
                style={{ fontSize: "9px", letterSpacing: "0.25em" }}
              >
                COMPANY
              </p>
              {[
                "About Rahi",
                "Journal",
                "Press",
                "Sustainability",
                "Careers",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  data-ocid="footer.link"
                  className="block w-full text-left font-sans-ui text-rahi-footer-text/70 hover:text-rahi-footer-text transition-colors mb-3"
                  style={{ fontSize: "11px", letterSpacing: "0.05em" }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div>
              <p
                className="font-sans-ui text-rahi-footer-text/50 mb-5"
                style={{ fontSize: "9px", letterSpacing: "0.25em" }}
              >
                STORES
              </p>
              {["New York", "Paris", "Tokyo", "London"].map((item) => (
                <button
                  key={item}
                  type="button"
                  data-ocid="footer.link"
                  className="block w-full text-left font-sans-ui text-rahi-footer-text/70 hover:text-rahi-footer-text transition-colors mb-3"
                  style={{ fontSize: "11px", letterSpacing: "0.05em" }}
                >
                  {item}
                </button>
              ))}

              <div className="mt-8">
                <p
                  className="font-sans-ui text-rahi-footer-text/50 mb-3"
                  style={{ fontSize: "9px", letterSpacing: "0.25em" }}
                >
                  NEWSLETTER
                </p>
                {emailSubmitted ? (
                  <p
                    data-ocid="newsletter.success_state"
                    className="font-sans-ui text-rahi-footer-text/70"
                    style={{ fontSize: "10px", letterSpacing: "0.1em" }}
                  >
                    THANK YOU
                  </p>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex">
                    <input
                      data-ocid="newsletter.input"
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 bg-transparent border-b border-rahi-footer-text/30 text-rahi-footer-text placeholder-rahi-footer-text/30 focus:outline-none focus:border-rahi-footer-text pb-1 pr-2"
                      style={{ fontSize: "11px", letterSpacing: "0.05em" }}
                    />
                    <button
                      data-ocid="newsletter.submit_button"
                      type="submit"
                      className="text-rahi-footer-text/50 hover:text-rahi-footer-text transition-colors pl-2 pb-1"
                      aria-label="Subscribe"
                    >
                      →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div
            className="border-t pt-8"
            style={{ borderColor: "oklch(0.95 0.009 75 / 0.1)" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p
                className="font-sans-ui text-rahi-footer-text/40"
                style={{ fontSize: "9px", letterSpacing: "0.15em" }}
              >
                © {year} RAHI. ALL RIGHTS RESERVED.
              </p>
              <p
                className="font-sans-ui text-rahi-footer-text/40"
                style={{ fontSize: "9px", letterSpacing: "0.15em" }}
              >
                Built with ♥ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rahi-footer-text/70 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
