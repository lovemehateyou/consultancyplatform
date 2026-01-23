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
    governmentLink: string;
    documentUrl: string;
  } | null;
}

const DocumentDetailDialog = ({
  open,
  onOpenChange,
  document,
}: DocumentDetailDialogProps) => {
  if (!document) return null;

  const handleOpenDocument = () => {
    window.open(document.documentUrl, "_blank");
  };

  const handleDownload = () => {
    const link = window.document.createElement("a");
    link.href = document.documentUrl;
    link.download = document.title;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        {/* Banner Image */}
        <div className="aspect-[16/9] w-full overflow-hidden">
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
          <a
            href={document.governmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <Globe className="h-4 w-4" />
            View on Government Website
          </a>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleOpenDocument}
              className="flex-1"
              variant="outline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Browser
            </Button>
            <Button onClick={handleDownload} className="flex-1">
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
