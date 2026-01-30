import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export interface MaterialFormData {
  title: string;
  subtitle: string;
  category: string;
  contentType: "file" | "article";
  description: string;
  governmentLink: string;
  image: File | null;
  document: File | null;
}

interface UploadMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: MaterialFormData) => Promise<void> | void;
}

const UploadMaterialDialog = ({ open, onOpenChange, onSave }: UploadMaterialDialogProps) => {
  const [formData, setFormData] = useState<MaterialFormData>({
    title: "",
    subtitle: "",
    category: "",
    contentType: "file",
    description: "",
    governmentLink: "",
    image: null,
    document: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof MaterialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, document: file }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = () => {
    setFormData((prev) => ({ ...prev, document: null }));
    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    await onSave(formData);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      contentType: "file",
      description: "",
      governmentLink: "",
      image: null,
      document: null,
    });
    setImagePreview(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const isValid =
    formData.title.trim() !== "" &&
    formData.category.trim() !== "" &&
    (formData.contentType === "file"
      ? Boolean(formData.document)
      : Boolean(formData.description.trim()));
  const isCoverImageDisabled = formData.contentType === "file";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upload New Material</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-bold">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter document title"
              className="bg-card border-border"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="font-bold">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="Enter document subtitle"
              className="bg-card border-border"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <Label htmlFor="contentType" className="font-bold">Content Type *</Label>
            <select
              id="contentType"
              value={formData.contentType}
              aria-label="Content type"
              onChange={(e) => {
                const nextType = e.target.value as "file" | "article";
                setFormData((prev) => ({
                  ...prev,
                  contentType: nextType,
                  document: nextType === "article" ? null : prev.document,
                  image: nextType === "file" ? null : prev.image,
                }));
                if (nextType === "article" && documentInputRef.current) {
                  documentInputRef.current.value = "";
                }
                if (nextType === "file") {
                  setImagePreview(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }
              }}
              className="h-10 rounded-md border border-border bg-card px-3 text-sm"
            >
              <option value="file">File upload</option>
              <option value="article">Article</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="font-bold">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="e.g. Finance, Marketing"
              className="bg-card border-border"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="font-bold">Cover Image</Label>
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (!isCoverImageDisabled) {
                    imageInputRef.current?.click();
                  }
                }}
                className={`w-full h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center transition-colors ${
                  isCoverImageDisabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:border-primary/50"
                }`}
              >
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload cover image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isCoverImageDisabled}
              aria-label="Cover image upload"
            />
          </div>

          {/* Document Upload */}
          <div className="space-y-2">
            <Label className="font-bold">Document File</Label>
            {formData.document ? (
              <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">{formData.document.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveDocument}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => documentInputRef.current?.click()}
                className={`w-full p-6 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center transition-colors ${
                  formData.contentType === "article"
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:border-primary/50"
                }`}
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload document</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 20MB</p>
              </div>
            )}
            <input
              ref={documentInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentChange}
              className="hidden"
              disabled={formData.contentType === "article"}
              aria-label="Document upload"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter a description about this document..."
              className="bg-card border-border min-h-[100px]"
              disabled={formData.contentType === "file"}
            />
            {formData.contentType === "article" ? (
              <p className="text-xs text-muted-foreground">Required for articles.</p>
            ) : null}
          </div>

          {/* Government Link */}
          <div className="space-y-2">
            <Label htmlFor="governmentLink" className="font-bold">Government Website Link</Label>
            <Input
              id="governmentLink"
              type="url"
              value={formData.governmentLink}
              onChange={(e) => handleInputChange("governmentLink", e.target.value)}
              placeholder="https://example.gov.et/..."
              className="bg-card border-border"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isValid}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upload Material
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMaterialDialog;
