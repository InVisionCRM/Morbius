"use client";

export default function JoinDiscussionSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <p className="text-2xl md:text-3xl font-bold leading-relaxed text-white">
          Join the discussion and find out...
        </p>
        
        <a
          href="https://t.me/morbius_cash"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <svg className="h-12 w-12 md:h-16 md:w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

