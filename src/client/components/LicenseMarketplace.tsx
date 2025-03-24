import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '../../hooks/useProgram';

interface License {
  publicKey: string;
  content: string;
  licensee: string;
  terms: {
    duration: number;
    usageType: 'AI_Training' | 'Commercial' | 'NonCommercial';
    paymentAmount: number;
    paymentToken: string;
  };
  createdAt: number;
}

export const LicenseMarketplace: FC = () => {
  const { publicKey } = useWallet();
  const { program } = useProgram();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = async () => {
      if (!program) return;

      try {
        // TODO: Implement license fetching logic
        setLicenses([]);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, [program]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (licenses.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No licenses available in the marketplace
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {licenses.map((license) => (
        <div
          key={license.publicKey}
          className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Content: {license.content.slice(0, 8)}...
              </h3>
              <p className="text-sm text-gray-500">
                Licensee: {license.licensee.slice(0, 8)}...
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {license.terms.paymentAmount} SOL
              </p>
              <p className="text-xs text-gray-500">
                Duration: {license.terms.duration} days
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {license.terms.usageType}
              </span>
            </div>
          </div>
          {publicKey && (
            <div className="mt-4">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Purchase License
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 