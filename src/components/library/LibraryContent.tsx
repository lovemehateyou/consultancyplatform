import LibraryKPICards from "./LibraryKPICards";
import LibraryFilters from "./LibraryFilters";
import DocumentCard from "./DocumentCard";

const documents = [
  {
    id: 1,
    title: "Most popular design systems to learn from in 2022",
    category: "Design Systems",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Understanding accessibility makes you a better",
    category: "Accessibility",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "15 best tools that will help you build your website",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
];

const LibraryContent = () => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Library Management</h1>
      
      <div className="space-y-6">
        <LibraryKPICards />
        
        <LibraryFilters />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              category={doc.category}
              imageUrl={doc.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryContent;
