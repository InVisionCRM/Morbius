"use client";

export default function BuyNowSection() {
  return (
    <section id="buy-now" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 md:mb-6">
            Buy Now
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light">
            Purchase MORBIUS tokens directly on PulseChain
          </p>
        </div>
        <div className="rounded-xl md:rounded-2xl overflow-hidden border border-gray-700 shadow-2xl shadow-purple-500/10">
          <iframe
            src="https://switch.win/widget?chain=pulsechain&darkMode=true&tokenIn=0xA1077a294dDE1B09bB078844df40758a5D0f9a27&tokenOut=0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1"
            className="w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[625px]"
            style={{ border: 'none' }}
            title="Buy MORBIUS on PulseChain"
          />
        </div>
      </div>
    </section>
  );
}

