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
      <div className="relative z-10 text-center px-4 md:px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8">
          More
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
          Under construction
        </p>
      </div>
    </section>
  );
}

