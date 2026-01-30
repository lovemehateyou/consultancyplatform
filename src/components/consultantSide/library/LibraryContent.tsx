import { useEffect, useMemo, useState } from "react";
import LibraryFilters from "./LibraryFilters";
import DocumentCard from "./DocumentCard";
import DocumentDetailDialog from "@/components/userSide/library/DocumentDetailDialog";
import { listContent, type ContentItem } from "@/services/content";
import { useToast } from "@/hooks/use-toast";

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  isPaid: boolean;
  description: string;
  governmentLink?: string | null;
  documentUrl?: string | null;
}
const fallbackImage = "https://placehold.co/400x300/png?text=Library";

const LibraryContent = () => {
  const [filters, setFilters] = useState({
    category: "all",
    date: "",
    access: "all",
  });
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await listContent();
        setContentItems(response);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load library content.";
        toast({
          title: "Library unavailable",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [toast]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    contentItems.forEach((item) => {
      if (item.category) unique.add(item.category);
    });
    return Array.from(unique).sort();
  }, [contentItems]);

  const documents = useMemo<DocumentItem[]>(() => {
    return contentItems.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      imageUrl: fallbackImage,
      date: item.createdAt,
      isPaid: item.contentType === "file",
      description: item.description ?? "No description provided.",
      governmentLink: null,
      documentUrl: item.fileUrl ?? null,
    }));
  }, [contentItems]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (filters.category !== "all" && doc.category !== filters.category) {
        return false;
      }

      if (filters.date) {
        const docDate = new Date(doc.date).toISOString().slice(0, 10);
        if (docDate !== filters.date) return false;
      }

      if (filters.access === "paid" && !doc.isPaid) {
        return false;
      }

      if (filters.access === "free" && doc.isPaid) {
        return false;
      }

      return true;
    });
  }, [filters, documents]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDocumentClick = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setDialogOpen(true);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Library Management</h1>
      
      <div className="space-y-6">
        <LibraryFilters
          filters={filters}
          categories={categories}
          onCategoryChange={(value) => handleFilterChange("category", value)}
          onDateChange={(value) => handleFilterChange("date", value)}
          onAccessChange={(value) => handleFilterChange("access", value)}
        />

        {isLoading ? (
          <div className="mt-10 border border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
            Loading content...
          </div>
        ) : filteredDocuments.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                category={doc.category}
                imageUrl={doc.imageUrl}
                date={doc.date}
                isPaid={doc.isPaid}
                onClick={() => handleDocumentClick(doc)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
            No documents match your filters yet.
          </div>
        )}
      </div>

      <DocumentDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        document={
          selectedDocument
            ? {
                title: selectedDocument.title,
                category: selectedDocument.category,
                imageUrl: selectedDocument.imageUrl,
                description: selectedDocument.description,
                governmentLink: selectedDocument.governmentLink,
                documentUrl: selectedDocument.documentUrl,
              }
            : null
        }
      />
    </div>
  );
};

export default LibraryContent;
