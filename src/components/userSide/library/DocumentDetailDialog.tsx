import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, Globe } from "lucide-react";

interface DocumentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    governmentLink?: string | null;
    documentUrl?: string | null;
  } | null;
}

const DocumentDetailDialog = ({
  open,
  onOpenChange,
  document,
}: DocumentDetailDialogProps) => {
  if (!document) return null;

  const handleOpenDocument = () => {
    if (!document.documentUrl) return;
    window.open(document.documentUrl, "_blank");
  };

  const handleDownload = () => {
    if (!document.documentUrl) return;
    const link = window.document.createElement("a");
    link.href = document.documentUrl;
    link.download = document.title;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-full p-0 overflow-y-auto">
        {/* Banner Image */}
        <div className="aspect-[16/9] w-full">
          <img
            src={document.imageUrl}
            alt={document.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {document.title}
            </DialogTitle>
            <span className="text-primary text-sm font-medium">
              {document.category}
            </span>
          </DialogHeader>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {document.description}
          </p>

          {/* Government Link */}
          {document.governmentLink ? (
            <a
              href={document.governmentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline text-sm"
            >
              <Globe className="h-4 w-4" />
              View on Government Website
            </a>
          ) : null}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleOpenDocument}
              className="flex-1"
              variant="outline"
              disabled={!document.documentUrl}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Browser
            </Button>
            <Button onClick={handleDownload} className="flex-1" disabled={!document.documentUrl}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailDialog;
