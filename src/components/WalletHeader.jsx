import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { DuplicateIcon, CheckIcon, CogIcon } from '@heroicons/react/outline';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { ethers } from 'ethers';

import eth from '../assets/ethereum-logo.png';
import matic from '../assets/polygon-logo.png';
import bnb from '../assets/binance-logo.png';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/4299b69d50b54f9fafc81f91c46869de'
);

function WalletHeader() {
  const [copyAddress, setCopyAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [blockNumber, setBlockNumber] = useState(10);

  function copyAddr() {
    navigator.clipboard.writeText(selectedAddress);
    setCopyAddress(true);
    console.log('copied');
    setTimeout(() => {
      setCopyAddress(false);
    }, 1000);
  }

  async function getBlockNumber() {
    const block = await provider.getBlock('latest');
    setBlockNumber(block.number);
  }

  useEffect(() => {
    if (
      !localStorage.getItem('accounts') ||
      !localStorage.getItem('walletPassword')
    ) {
      window.location.replace('/');
    }

    setSelectedAddress(JSON.parse(localStorage.getItem('accounts'))[0].address);
  }, []);

  provider.on('block', (block) => {
    setBlockNumber(block);
  });

  return (
    <div className="w-full p-1 flex justify-between">
      <div className="flex">
        <div className="inline-flex text-gray-300 -space-x-px text-xs rounded-md">
          <button
            className="font-medium w-20 bg-[#1F293733] border border-gray-600 rounded-l-md focus:outline-none focus:z-10 hover:bg-gray-700"
            type="button"
          >
            Dashboard
          </button>

          <button
            className="font-medium w-20 bg-[#1F293733] border border-gray-600 focus:outline-none focus:z-10 hover:bg-gray-700"
            type="button"
          >
            Send
          </button>

          <button
            className="font-medium w-20 bg-[#1F293733] border border-gray-600 rounded-r-md focus:outline-none focus:z-10 hover:bg-gray-700"
            type="button"
          >
            Settings
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="bg-gray-800 space-x-2 mr-1 w-52 px-3 bg-opacity-20 rounded-md flex items-center">
          <div className="flex items-center">
            <Jazzicon seed={jsNumberForAddress(selectedAddress)} />
          </div>
          <p className="truncate text-sm text-gray-300 font-medium">
            {selectedAddress}
          </p>
          <button onClick={copyAddr} className="py-1">
            {copyAddress ? (
              <CheckIcon className="w-4 h-4 text-emerald-300" />
            ) : (
              <DuplicateIcon className="w-4 h-4 text-gray-300" />
            )}
          </button>
          <button className="py-1">
            <ChevronDownIcon className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-gray-800 bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Networks
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-4 w-4 text-white"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-[#474F5B] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-emerald-600' : null
                        } group flex w-full text-white font-medium items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <img
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                          src={eth}
                          alt="Ethereum"
                        />
                        <p>Ethereum</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-emerald-600' : null
                        } group flex w-full text-white font-medium items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <img
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                          src={bnb}
                          alt="Binance"
                        />
                        <p>Binance</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-emerald-600' : null
                        } group flex w-full text-white font-medium items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <img
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                          src={matic}
                          alt="Polygon"
                        />
                        <p>Polygon</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-emerald-600' : null
                        } group flex w-full text-white font-medium items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <img
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                          src={eth}
                          alt="Ethereum"
                        />
                        <p>Rinkeby testnet</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <button className="px-3 bg-[#1F293733] hover:bg-gray-700 text-gray-300 rounded-md ml-1">
          <CogIcon className="w-4 h-4 opacity-100" />
        </button>
      </div>

      <div className="fixed flex items-center py-0.5 px-2 bg-[#1F293733] space-x-1 bottom-1 right-1 rounded-full text-gray-300 text-xs font-semibold">
        <p>{blockNumber}</p>
        <div className="bg-emerald-500 w-1.5 h-1.5 rounded-full"></div>
      </div>
    </div>
  );
}

export default WalletHeader;
