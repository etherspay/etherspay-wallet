import React from 'react';

import ETPIcon from '../assets/logo512.png';

function WalletHome() {
  return (
    <div className="flex justify-center">
      <div className="mt-20 text-center">
        <img src={ETPIcon} alt="Icon" className="w-24 mx-auto" />
        <div className="my-3 text-gray-200 font-semibold">
          Welcome to the Etherspay Wallet
        </div>
        <div className="mb-5 text-gray-300 text-xs">
          Connecting you to Ethereum and the Decentralized Web.
        </div>
        <div className="flex justify-center">
          <p className="py-2 px-4 text-sm font-semibold transition ease-in hover:bg-emerald-700 text-gray-100 rounded-full bg-emerald-600">
            Home page
          </p>
        </div>
      </div>
    </div>
  );
}

export default WalletHome;
