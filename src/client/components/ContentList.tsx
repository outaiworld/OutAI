import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '../../hooks/useProgram';

interface Content {
  publicKey: string;
  creator: string;
  contentHash: string;
  usageRights: {
    aiTrainingAllowed: boolean;
    commercialUseAllowed: boolean;
    attributionRequired: boolean;
    royaltyPercentage: number;
  };
  createdAt: number;
}

export const ContentList: FC = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      if (!publicKey || !program) return;

      try {
        // TODO: Implement content fetching logic
        setContents([]);
      } catch (error) {
        console.error('Error fetching contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [publicKey, program]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No content uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <div
          key={content.publicKey}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Content Hash: {content.contentHash.slice(0, 8)}...
              </h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(content.createdAt * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Edit Rights
              </button>
              <button className="text-sm text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                AI Training: {content.usageRights.aiTrainingAllowed ? 'Allowed' : 'Not Allowed'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Commercial: {content.usageRights.commercialUseAllowed ? 'Allowed' : 'Not Allowed'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Royalty: {content.usageRights.royaltyPercentage}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 