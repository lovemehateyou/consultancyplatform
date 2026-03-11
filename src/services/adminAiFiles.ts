import { API_BASE_URL, parseResponse } from "./api";

const AI_FILES_BASE_URL = `${API_BASE_URL}/admin/ai-files`;

export type AiFileItem = {
  name: string;
  size: number;
  updatedAt: string;
};

export type AiFilesListResponse = {
  data: AiFileItem[];
};

export type AiFilesUploadResponse = {
  message: string;
  data: { name: string }[];
};

export type AiFilePreviewResponse = {
  data: { preview: string };
};

export const listAiFiles = async (): Promise<AiFilesListResponse> => {
  const response = await fetch(AI_FILES_BASE_URL, {
    credentials: "include",
  });

  return parseResponse<AiFilesListResponse>(response);
};

export const uploadAiFiles = async (files: File[]): Promise<AiFilesUploadResponse> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await fetch(AI_FILES_BASE_URL, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return parseResponse<AiFilesUploadResponse>(response);
};

export const deleteAiFile = async (fileName: string): Promise<{ message: string }> => {
  const response = await fetch(`${AI_FILES_BASE_URL}/${encodeURIComponent(fileName)}`, {
    method: "DELETE",
    credentials: "include",
  });

  return parseResponse<{ message: string }>(response);
};

export const replaceAiFile = async (fileName: string, file: File): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${AI_FILES_BASE_URL}/${encodeURIComponent(fileName)}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  return parseResponse<{ message: string }>(response);
};

export const previewAiFile = async (fileName: string): Promise<AiFilePreviewResponse> => {
  const response = await fetch(
    `${AI_FILES_BASE_URL}/${encodeURIComponent(fileName)}/preview`,
    { credentials: "include" },
  );

  return parseResponse<AiFilePreviewResponse>(response);
};
