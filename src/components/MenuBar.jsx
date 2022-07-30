import React from 'react';
import ETPIcon from '../assets/logo512.png';

// Icons
import { DuplicateIcon, XIcon, MinusIcon } from '@heroicons/react/outline';

function MenuBar() {
  return (
    <div className="h-8">
      <div className="h-8 fixed z-50 w-full items-center overflow-hidden bg-gray-700 justify-between flex left-0 top-0 pl-1 select-none menubar">
        <div className="space-x-2 flex items-center flex-1">
          <img alt="Icon" className="w-5 h-5" src={ETPIcon} />
          <span className="text-gray-300 text-xs font-medium">
            Etherspay Wallet
          </span>
        </div>
        <div className="menubar-nodrag">
          <button
            onClick={() => window.electron.send('minimize')}
            className="text-gray-300 hover:bg-gray-600 p-4 focus:border-none focus:ring-0 focus:outline-none"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.electron.send('maximize')}
            className="text-gray-300 hover:bg-gray-600 p-4 focus:border-none focus:ring-0 focus:outline-none"
          >
            <DuplicateIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => window.electron.send('close')}
            className="text-gray-300 hover:bg-red-500 p-4 focus:border-none focus:ring-0 focus:outline-none"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
