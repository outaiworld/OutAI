import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '../../hooks/useProgram';

export const ContentUpload: FC = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !publicKey || !program) return;

    try {
      setUploading(true);
      // TODO: Implement content upload logic
      console.log('Uploading content:', file.name);
    } catch (error) {
      console.error('Error uploading content:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1z" />
          </svg>
          <span className="mt-2 text-base">Select a file</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      {file && (
        <div className="text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}; 