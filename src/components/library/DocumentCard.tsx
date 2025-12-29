interface DocumentCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

const DocumentCard = ({ title, category, imageUrl }: DocumentCardProps) => {
  return (
    <div className="group cursor-pointer">
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
    </div>
  );
};

export default DocumentCard;
