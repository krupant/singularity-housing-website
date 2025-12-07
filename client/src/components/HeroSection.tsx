import housingImage from "@assets/affordable_housing_1763220090545.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${housingImage})` }}
      />
      {/* Lighter gradient overlay to show background more clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center text-white py-10 pb-32 md:pb-24">
        <h1 
          className="md:text-5xl lg:text-6xl font-bold mb-6 text-[#ffffff] text-[52px]"
          style={{
            textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
          }}
        >
          Restoring Dignity Through Housing
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-24 md:mb-16 text-white/95">
          Innovative housing solutions for vulnerable populations. When people feel safe, they succeed in life.
        </p>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 5px rgba(0,0,0,.3), 0 6px 8px rgba(0,0,0,.2)'
                  }}
                >20+</div>
                <div className="text-sm text-white/90">Properties in Florida</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 5px rgba(0,0,0,.3), 0 6px 8px rgba(0,0,0,.2)'
                  }}
                >2018</div>
                <div className="text-sm text-white/90">Founded</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 5px rgba(0,0,0,.3), 0 6px 8px rgba(0,0,0,.2)'
                  }}
                >100%</div>
                <div className="text-sm text-white/90">Self-Funded</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 5px rgba(0,0,0,.3), 0 6px 8px rgba(0,0,0,.2)'
                  }}
                >US & Beyond</div>
                <div className="text-sm text-white/90">Expansion Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
