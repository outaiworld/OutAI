import { FC } from 'react';
import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ContentUpload } from '../components/ContentUpload';
import { ContentList } from '../components/ContentList';
import { LicenseMarketplace } from '../components/LicenseMarketplace';

const Home: FC = () => {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>OutAI - Creator Data Sovereignty Infrastructure</title>
        <meta name="description" content="Protect and monetize your content in the AI era" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">OutAI</h1>
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!connected ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Connect your wallet to get started
            </h2>
            <p className="mt-2 text-gray-600">
              OutAI helps you protect and monetize your content in the AI era
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Content</h2>
              <ContentUpload />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Content</h2>
              <ContentList />
            </div>
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">License Marketplace</h2>
              <LicenseMarketplace />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home; 