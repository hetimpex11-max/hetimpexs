export default function InstagramReels() {
  return (
    <section
      className="relative w-full py-20 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/image_5e4daa.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-widest text-center mb-12">
          EXQUISITE REEL SHOWCASE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/reel1.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-white text-sm font-medium mt-4">DESIGN INSPIRATION</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/reel2.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-white text-sm font-medium mt-4">CRAFTED TO PERFECTION</p>
          </div>
        </div>
      </div>
    </section>
  );
}
