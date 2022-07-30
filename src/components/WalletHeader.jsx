import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/solid';
import { DuplicateIcon, CheckIcon } from '@heroicons/react/outline';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import eth from '../assets/ethereum-logo.png';
import matic from '../assets/polygon-logo.png';
import bnb from '../assets/binance-logo.png';

function WalletHeader() {
  const [copyAddress, setCopyAddress] = useState(false);

  function copyAddr() {
    navigator.clipboard.writeText('address');
    setCopyAddress(true);

    setTimeout(() => {
      setCopyAddress(false);
    }, 1000);
  }

  return (
    <div className="w-full p-1 flex justify-between">
      <div></div>
      <div className="flex">
        <div className="bg-gray-800 space-x-2 mr-1 w-52 px-3 bg-opacity-20 rounded-md flex items-center">
          <div className="flex items-center">
            <Jazzicon
              seed={jsNumberForAddress(
                '0xa74dA5A31B231C8c253bBE044eb2ecb924B422bC'
              )}
            />
          </div>
          <p className="truncate text-sm text-gray-300 font-medium">
            0xa74dA5A31B231C8c253bBE044eb2ecb924B422bC
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
                          active ? 'bg-emerald-500' : null
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
                          active ? 'bg-emerald-500' : null
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
                          active ? 'bg-emerald-500' : null
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
                          active ? 'bg-emerald-500' : null
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
        <div></div>
      </div>
    </div>
  );
}

export default WalletHeader;
