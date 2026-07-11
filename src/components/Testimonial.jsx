const testimonials = [
  {
    initials: "JC",
    name: "Jason Cook Mgmt",
    role: "Talent Management",
    quote: "Wonderful to work with. Looking forward to working with them again.",
  },
  {
    initials: "GG",
    name: "Goods+Gadgets",
    role: "E-commerce",
    quote: "Great experience and superb professionalism. Gone above and beyond to fix small bugs and even adjusted features that weren't clearly communicated. Will surely and happily come back again and again. Highly recommended!",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-black px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-4">
          Client feedback
        </p>
        <h2 className="text-4xl font-medium text-white mb-12">What clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-8 flex flex-col gap-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-black" viewBox="0 0 16 16">
                    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
                  </svg>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-neutral-900 font-serif">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 mt-auto">
                <div className="w-10 h-10 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}