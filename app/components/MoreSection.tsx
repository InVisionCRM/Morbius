"use client";

export default function MoreSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img
          src="/Web ui/more.png"
          alt="More Background"
          className="w-full h-full object-cover blur-2xl"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
          More
        </h2>
        <p className="text-2xl md:text-3xl text-gray-300 font-light">
          Under construction
        </p>
      </div>
    </section>
  );
}

