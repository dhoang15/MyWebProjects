export const ServiceCard = ({ title, description, contactInfo, color, onSelect }) => {
    return (
      <div className={`bg-${color}-50 border-2 border-${color}-500 rounded-3xl p-8 text-center hover:scale-105 transition-all cursor-pointer shadow-lg group`}>
             <div className="text-6xl mb-4 group-hover:animate-bounce">⚔️</div>
             <h3 className={`font-black text-xl text-${color}-700 uppercase mb-3`}>{title}</h3>
             <p className="text-xs font-bold text-gray-600 mb-6 px-4">{description}</p>
             <button className={`bg-${color}-600 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase shadow-md hover:bg-${color}-700`} onClick={onSelect}>
               {contactInfo}
             </button>
          </div>
    );
};