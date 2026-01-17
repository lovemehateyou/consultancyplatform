import React from 'react';
import { useNavigate } from 'react-router-dom';

// Defining the props for the individual card for better component structure
interface AccountCardProps {
  title: string;
  isPrimary: boolean;
  path: string;
}

const AccountSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSelection = (path: string) => {
    // This will push the new route to the browser history
    navigate(path);
  };

  const options: AccountCardProps[] = [
    { 
      title: 'User Account', 
      isPrimary: false, 
      path: '/userregistration' 
    },
    { 
      title: 'Consultant Account', 
      isPrimary: true, 
      path: '/consultancyregistration' 
    },
  ];

  return (
    <section className="w-full py-10 px-6 bg-[#F8F9FB]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-16">
          What Account Do You Want
        </h2>

        {/* The Container from  */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-16 flex flex-col md:flex-row gap-8 justify-center items-stretch">
          
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelection(option.path)}
              className={`
                flex-1 min-h-[250px] rounded-2xl flex items-center justify-center transition-all duration-300
                text-xl font-bold border-2 active:scale-95
                ${option.isPrimary 
                  ? 'bg-[#5651FF] text-white border-[#5651FF] hover:bg-[#4540e6] shadow-lg shadow-blue-200' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
                }
              `}
            >
              {option.title}
            </button>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AccountSelection;