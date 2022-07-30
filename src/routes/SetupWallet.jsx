import React, { useRef, useEffect, useState } from 'react';

import { ArrowSmLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import WalletSteps from '../components/WalletSteps';

import { ethers } from 'ethers';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

function SetupWallet() {
  const pwd = useRef();
  const pwd2 = useRef();
  const terms = useRef();

  const [allowed, setAllowed] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);

  async function handleSubmit() {
    const wallet = await ethers.Wallet.createRandom();
    setMnemonic(wallet.mnemonic);
  }
  function checkPasswords() {
    if (
      pwd.current.value === pwd2.current.value &&
      pwd.current.value.length > 7
    ) {
      if (terms.current.checked === true) {
        setAllowed(true);
      }
    } else {
      setAllowed(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto my-5">
      <WalletSteps step={1} title="Enter passwords" />
      <a
        href="/setupwallet/"
        className="flex w-fit mt-1 items-center py-1 text-sm font-semibold space-x-1 text-gray-200"
      >
        <ArrowSmLeftIcon className="w-4 h-4" />
        <p>Go back</p>
      </a>
      <div className="mt-3">
        <div className="mt-1">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <div className="text-gray-200 text-lg font-semibold">
                Create a wallet password
              </div>
              <div className="mt-4">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-200 after:ml-0.5 after:text-red-500 after:content-['*']"
                >
                  New password
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    ref={pwd}
                    onChange={checkPasswords}
                    type="password"
                    name="pwd"
                    id="pwd"
                    className="block text-gray-200 border-2 w-full flex-1 bg-gray-600 rounded-md border-gray-400 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-200 after:ml-0.5 after:text-red-500 after:content-['*']"
                >
                  Confirm password
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    ref={pwd2}
                    onChange={checkPasswords}
                    type="password"
                    name="confirm-pwd"
                    id="confirm-pwd"
                    className="block text-gray-200 border-2 w-full flex-1 bg-gray-600 rounded-md border-gray-400 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <input
                  id="payments"
                  name="payments"
                  type="checkbox"
                  onChange={checkPasswords}
                  required
                  ref={terms}
                  className="h-4 w-4 p-2 rounded bg-gray-500 text-emerald-600 focus:ring-emerald-500 focus:ring-transparent focus:outline-none"
                />
                <label
                  for="checkbox-1"
                  class="text-sm ml-3 font-medium text-gray-200"
                >
                  I agree to the{' '}
                  <a
                    href="https://github.com/etherspay"
                    className="text-emerald-500 hover:underline"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={allowed ? handleSubmit : null}
            className={`relative inline-flex items-center px-6 py-2 overflow-hidden text-white ${
              allowed
                ? 'bg-emerald-600 active:bg-emerald-700'
                : 'bg-gray-500 cursor-default'
            } rounded group focus:outline-none focus:ring-0`}
          >
            {allowed ? (
              <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            ) : null}

            <span
              className={`text-sm font-medium ${
                allowed ? 'transition-all group-hover:mr-4' : null
              }`}
            >
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetupWallet;
