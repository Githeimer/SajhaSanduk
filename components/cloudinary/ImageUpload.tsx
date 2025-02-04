'use client';
import { useState, FormEvent, JSX } from 'react';
import { Button } from '../ui/button';

interface CloudinaryResponse {
  url: string;
  public_id: string;
}

interface ErrorResponse {
  error: string;
}

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps): JSX.Element {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const fileInput = form.file as HTMLInputElement;
    const files = fileInput.files;
    
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      setError('');
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', files[0]); // Assuming single image upload

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json() as CloudinaryResponse | ErrorResponse;

      if (!response.ok) {
        throw new Error('error' in data ? data.error : 'Upload failed');
      }

      if ('url' in data) {
        onUploadComplete(data.url); // Send the image URL back to Profile component
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
            Choose an Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="w-full border p-2"
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className=" text-white px-4 py-2 rounded disabled:bg-gray-400"
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

      {error && (
        <div className="text-red-500 mt-4">{error}</div>
      )}
    </div>
  );
}
