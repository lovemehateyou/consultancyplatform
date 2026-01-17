import React from 'react';

// 1. Defining the props for reusability
interface Whatwedo {
  title: string;
  description: string;
}

const WhatWeDo: React.FC<Whatwedo> = ({ title, description }) => {
  return (
    <section className="w-full py-10 px-6 md:px-12 bg-white">
      {/* 2. Container: Stacks on mobile (flex-col), side-by-side on medium screens (md:flex-row) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Heading Column */}
        <div className="w-full h-full flex justify-center items-center md:w-1/3">
          <h2 className="text-2xl md:text-6xl font-extrabold text-black">
            {title}
          </h2>
        </div>

        {/* Description Column */}
        <div className="w-full md:w-2/3">
          <p className="text-md leading-relaxed text-gray-800">
            {description}
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;