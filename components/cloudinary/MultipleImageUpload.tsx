'use client';
import { Button } from '@/components/ui/button';
import { useState, FormEvent } from 'react';

interface CloudinaryResponse {
  url: string;
  public_id: string;
}

interface ErrorResponse {
  error: string;
}

interface MultiImageUploadProps {
  onUploadComplete?: (urls: string[]) => void; 
}

export default function MultiImageUpload({ onUploadComplete }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const fileInput = form.file as HTMLInputElement;
    const files = fileInput.files;

    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    setUploadProgress(0);

    const uploadedImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const response = await fetch('/api/cloudinary', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json() as CloudinaryResponse | ErrorResponse;

        if (!response.ok) {
          throw new Error('error' in data ? data.error : 'Upload failed');
        }

        if ('url' in data) {
          uploadedImages.push(data.url);
        }

        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setUploadedUrls(uploadedImages);
      console.log("Uploaded Images:", uploadedImages);

      // Call onUploadComplete only if it's provided
      if (onUploadComplete) {
        onUploadComplete(uploadedImages);
      }

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block mb-2">
            Choose Images
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            multiple
            className="w-full border p-2"
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Uploaded Images:</p>
          <div className="grid grid-cols-3 gap-2">
            {uploadedUrls.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
