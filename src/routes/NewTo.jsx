import React from 'react';
import {
  DownloadIcon,
  PlusSmIcon,
  ArrowSmLeftIcon,
} from '@heroicons/react/solid';

function Newto() {
  return (
    <div className="mt-20 flex items-center flex-col">
      <div className="text-gray-200 font-semibold">
        New to Etherspay Wallet?
      </div>
      <div className="mt-8 flex items-center gap-2">
        <div className="border border-dashed border-gray-400 rounded w-64 h-40 flex text-center items-center flex-col p-4 justify-center">
          <div className="font-medium text-gray-200">Import wallet</div>
          <div className="text-xs text-gray-400">
            Import your existing wallet using a Secret Recovery Phrase
          </div>
          <a
            href="/setupwallet/import"
            className="py-2 space-x-2 px-4 flex items-center mt-4 text-sm font-semibold transition ease-in hover:bg-emerald-700 text-gray-100 rounded-full bg-emerald-600"
          >
            <DownloadIcon className="w-4 h-4" />
            <p>Import</p>
          </a>
        </div>
        <div className="border border-dashed border-gray-400 rounded w-64 h-40 flex text-center items-center flex-col p-4 justify-center">
          <div className="font-medium text-gray-200">Setup wallet</div>
          <div className="text-xs text-gray-400">
            This will create a new wallet and Secret Recovery Phrase
          </div>
          <a
            href="/setupwallet/setup"
            className="py-2 space-x-2 px-4 flex items-center mt-4 text-sm font-semibold transition ease-in hover:bg-emerald-700 text-gray-100 rounded-full bg-emerald-600"
          >
            <PlusSmIcon className="w-4 h-4" />
            <p>Setup</p>
          </a>
        </div>
      </div>
      <div className="my-4">
        <a
          href="/"
          className="flex items-center p-1 text-sm font-semibold space-x-1 text-emerald-500"
        >
          <ArrowSmLeftIcon className="w-4 h-4" />
          <p>Go back</p>
        </a>
      </div>
    </div>
  );
}

export default Newto;
