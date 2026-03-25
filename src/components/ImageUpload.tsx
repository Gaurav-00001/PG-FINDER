import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client"; // Adjust path to your supabase client

interface ImageUploadProps {
  propertyId: string; // Pass the ID of the PG property you are updating
}

export default function ImageUpload({ propertyId }: ImageUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputFileRef.current?.files) return;

    try {
      setIsUploading(true);
      const file = inputFileRef.current.files[0];

      // 1. Upload to Vercel Blob
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setBlob(newBlob);

      // 2. Save the URL to your Supabase Database
      const { error } = await supabase
      .from('properties' as any) // Add 'as any' to bypass strict table check
      .update({ image_url: newBlob.url } as any) // Add 'as any' here too
      .eq('id', propertyId);

      if (error) throw error;
      alert("Property image updated successfully!");

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to update image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input name="file" ref={inputFileRef} type="file" required accept="image/*" />
        <button 
          type="submit" 
          disabled={isUploading}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isUploading ? "Uploading..." : "Upload to Vercel"}
        </button>
      </form>

      {blob && (
        <div className="mt-4">
          <p className="text-sm">Live Preview:</p>
          <img src={blob.url} alt="Uploaded content" className="w-32 h-32 object-cover rounded" />
        </div>
      )}
    </div>
  );
}