import { useMemo, useState } from "react";
import LibraryFilters from "./libraryUploadFilters";
import DocumentCard from "./DocumentCard";
import UploadMaterialDialog, { MaterialFormData } from "./UploadMaterialDialog";
import DocumentDetailDialog from "@/components/userSide/library/DocumentDetailDialog";

type DocumentCategory = "design" | "accessibility" | "tech";

interface DocumentItem {
  id: number;
  title: string;
  category: DocumentCategory;
  imageUrl: string;
  date: string;
  isPaid: boolean;
  description: string;
  governmentLink: string;
  documentUrl: string;
}

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  design: "Design Systems",
  accessibility: "Accessibility",
  tech: "Tech",
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    title: "Most popular design systems to learn from in 2022",
    category: "design",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    date: "2024-05-12",
    isPaid: true,
    description:
      "A comprehensive guide covering the most influential design systems used by top companies. Learn best practices for creating scalable and consistent user interfaces that enhance user experience across platforms.",
    governmentLink: "https://www.gov.et/design-standards",
    documentUrl: "https://example.com/documents/design-systems.pdf",
  },
  {
    id: 2,
    title: "Understanding accessibility makes you a better",
    category: "accessibility",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    date: "2024-06-08",
    isPaid: false,
    description:
      "This document outlines the essential accessibility guidelines and requirements for digital services. Understanding these principles will help you create inclusive experiences for all users regardless of their abilities.",
    governmentLink: "https://www.gov.et/accessibility",
    documentUrl: "https://example.com/documents/accessibility-guide.pdf",
  },
  {
    id: 3,
    title: "15 best tools that will help you build your website",
    category: "tech",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    date: "2024-04-21",
    isPaid: false,
    description:
      "Discover the top 15 tools recommended for building modern, efficient websites. From development frameworks to deployment platforms, this guide covers everything you need to establish your online presence.",
    governmentLink: "https://www.gov.et/digital-business",
    documentUrl: "https://example.com/documents/website-tools.pdf",
  },
];

const LibraryContent = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [filters, setFilters] = useState({
    category: "all",
    date: "",
    access: "all",
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (filters.category !== "all" && doc.category !== filters.category) {
        return false;
      }

      if (filters.date && doc.date !== filters.date) {
        return false;
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

  const handleUploadMaterial = (data: MaterialFormData) => {
    const fallbackImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop";
    const imageUrl = data.image ? URL.createObjectURL(data.image) : fallbackImage;
    const documentUrl = data.document ? URL.createObjectURL(data.document) : imageUrl;

    const newDoc: DocumentItem = {
      id: documents.length + 1,
      title: data.title,
      category: "tech", // Default category, could be added to form
      imageUrl,
      date: new Date().toISOString().split("T")[0],
      isPaid: false,
      description: data.description || "Newly uploaded material.",
      governmentLink: data.governmentLink || "https://www.gov.et",
      documentUrl,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    console.log("Material uploaded:", data);
  };

  const handleDocumentClick = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setDetailDialogOpen(true);
  };

  const handleDetailDialogChange = (open: boolean) => {
    setDetailDialogOpen(open);
    if (!open) {
      setSelectedDocument(null);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Library Management</h1>
      
      <div className="space-y-6">
        {/* <LibraryKPICards /> */}

        <LibraryFilters
          filters={filters}
          onCategoryChange={(value) => handleFilterChange("category", value)}
          onDateChange={(value) => handleFilterChange("date", value)}
          onAccessChange={(value) => handleFilterChange("access", value)}
          onUploadClick={() => setUploadDialogOpen(true)}
        />

        {filteredDocuments.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                category={CATEGORY_LABELS[doc.category]}
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

      <UploadMaterialDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSave={handleUploadMaterial}
      />

      <DocumentDetailDialog
        open={detailDialogOpen}
        onOpenChange={handleDetailDialogChange}
        document={
          selectedDocument
            ? {
                title: selectedDocument.title,
                category: CATEGORY_LABELS[selectedDocument.category],
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
