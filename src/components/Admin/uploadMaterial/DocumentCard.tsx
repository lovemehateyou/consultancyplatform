interface DocumentCardProps {
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  isPaid: boolean;
  onClick?: () => void;
}

const DocumentCard = ({ title, category, imageUrl, date, isPaid, onClick }: DocumentCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="group cursor-pointer focus:outline-none"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-muted">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-foreground font-medium text-base mb-2 line-clamp-2">
        {title}
      </h3>
      <span className="text-primary text-sm font-medium">
        {category}
      </span>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
        <span>{formattedDate}</span>
        <span
          className={`px-2 py-0.5 rounded-full font-medium ${
            isPaid ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isPaid ? "Paid" : "Free"}
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
