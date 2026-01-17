import React from 'react'

function HowitWorks() {
  return (
        
     <section id="how" className="bg-white py-16 px-4 text-center text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 flex-wrap relative"> {/* Added relative for arrow positioning */}

          {/* Step 1 Card */}
          <div className="bg-white border border-blue-600 rounded-lg p-8 text-center shadow-md flex-1 min-w-[280px] max-w-[380px] relative z-10">
            <div className="text-black font-bold text-3xl mb-2">Step 1</div>
            <h3 className="text-blue-800 font-bold text-xl mb-4">Sign up as a business owner</h3>
            <p className="text-base text-muted-foreground leading-relaxed">Users can just create an account for free and start using this platform with just a few simple steps.</p>
          </div>

          {/* Step 2 Card */}
          <div className="bg-white border border-blue-600 rounded-lg p-8 text-center shadow-md flex-1 min-w-[280px] max-w-[380px] relative z-10">
            <div className="text-black font-bold text-3xl mb-2">Step 2</div>
            <h3 className="text-blue-800 font-bold text-xl mb-4">Consult with our Professionals</h3>
            <p className="text-base text-muted-foreground leading-relaxed ">They browse our consultants, tap to schedule a date and when the time comes hope into a meeting with them .</p>
          </div>

          {/* Step 3 Card */}
          <div className="bg-white border border-blue-600 rounded-lg p-8 text-center shadow-md flex-1 min-w-[280px] max-w-[380px] relative z-10">
            <div className="text-black font-bold text-3xl mb-2">Step 3</div>
            <h3 className="text-blue-800 font-bold text-xl mb-4">Grow Your Business Instantly</h3>
            <p className="text-base text-muted-foreground leading-relaxed">From the moment you start using this platform We will be dedicated to help you grow your business faster.</p>
          </div>

        </div>
        
      </div>
    </section>
  )
}

export default HowitWorks
