import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAiFile,
  listAiFiles,
  previewAiFile,
  replaceAiFile,
  uploadAiFiles,
  type AiFileItem,
} from "@/services/adminAiFiles";

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let index = 0;
  let value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(1)} ${units[index]}`;
};

const AiFilesContent = () => {
  const [files, setFiles] = useState<AiFileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [replaceTarget, setReplaceTarget] = useState<AiFileItem | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [previewTarget, setPreviewTarget] = useState<AiFileItem | null>(null);
  const [previewContent, setPreviewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await listAiFiles();
      setFiles(response.data ?? []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load AI files.";
      toast({ title: "Unable to load AI files", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    setLoading(true);
    try {
      await deleteAiFile(fileName);
      toast({ title: "File deleted", description: "AI file removed." });
      await fetchFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete AI file.";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReplace = async () => {
    if (!replaceTarget || !replaceFile) {
      toast({ title: "Select a file", description: "Choose a file to replace." });
      return;
    }

    setLoading(true);
    try {
      await replaceAiFile(replaceTarget.name, replaceFile);
      toast({ title: "File replaced", description: "AI file was updated." });
      setReplaceTarget(null);
      setReplaceFile(null);
      await fetchFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to replace AI file.";
      toast({ title: "Replace failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (file: AiFileItem) => {
    setPreviewTarget(file);
    setPreviewContent("Loading preview...");
    try {
      const response = await previewAiFile(file.name);
      setPreviewContent(response.data.preview || "(No preview available)");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load preview.";
      setPreviewContent(message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(inputFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({ title: "Select files", description: "Choose at least one file to upload." });
      return;
    }

    setLoading(true);
    try {
      await uploadAiFiles(selectedFiles);
      toast({ title: "Upload complete", description: "AI files were added successfully." });
      setSelectedFiles([]);
      await fetchFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload AI files.";
      toast({ title: "Upload failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const uploadLabel = useMemo(() => {
    if (selectedFiles.length === 0) return "No files selected";
    if (selectedFiles.length === 1) return selectedFiles[0].name;
    return `${selectedFiles.length} files selected`;
  }, [selectedFiles]);

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">AI Context Files</h1>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stored Context Files</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading files...</p>
            ) : files.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No AI context files uploaded yet.
              </p>
            ) : (
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-background px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(file.size)} · {new Date(file.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(file)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplaceTarget(file);
                          setReplaceFile(null);
                        }}
                      >
                        Replace
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete AI file?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This removes {file.name} from the AI context folder.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(file.name)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="file"
                multiple
                accept=".txt,.md,.pdf,.json,.csv"
                onChange={handleFileChange}
              />
              <p className="mt-2 text-xs text-muted-foreground">{uploadLabel}</p>
            </div>
            <Button onClick={handleUpload} disabled={loading} className="w-full">
              {loading ? "Uploading..." : "Upload to AI Files"}
            </Button>
            <p className="text-xs text-muted-foreground">
              The assistant scans all files in the AI files folder before answering.
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={Boolean(previewTarget)} onOpenChange={() => setPreviewTarget(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview: {previewTarget?.name}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm text-muted-foreground">
            {previewContent}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(replaceTarget)} onOpenChange={() => setReplaceTarget(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Replace: {replaceTarget?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept=".txt,.md,.pdf,.json,.csv"
              onChange={(event) => {
                const nextFile = event.target.files?.[0] ?? null;
                setReplaceFile(nextFile);
              }}
            />
            <Button onClick={handleReplace} disabled={loading || !replaceFile}>
              {loading ? "Replacing..." : "Replace File"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AiFilesContent;
