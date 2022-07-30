import React, { useRef, useState } from 'react';

import { ArrowSmLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { ExclamationIcon } from '@heroicons/react/outline';
import WalletSteps from '../components/WalletSteps';

import { ethers } from 'ethers';

const bcrypt = require('bcryptjs');
// const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

function SetupWallet() {
  const pwd = useRef();
  const pwd2 = useRef();
  const terms = useRef();
  const seed = useRef();

  const [allowed, setAllowed] = useState(false);
  const [backupMnemonic, setBackupMnemonic] = useState(false);
  const [verifyMnemonic, setVerifyMnemonic] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit() {
    const wallet = await ethers.Wallet.createRandom();
    setWallet(wallet);

    try {
      bcrypt.hash(pwd.current.value, 8, function (err, hash) {
        localStorage.setItem('walletPassword', hash);
        console.log(wallet);
        localStorage.setItem(
          'accounts',
          JSON.stringify([
            {
              name: 'Account 1',
              address: wallet.address,
              mnemonic: wallet.mnemonic.phrase,
              privateKey: wallet.privateKey,
              publicKey: wallet.publicKey,
            },
          ])
        );
        setBackupMnemonic(true);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPasswords() {
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

  function copyToClipboard() {
    navigator.clipboard.writeText(wallet.mnemonic.phrase);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function verifyMnemonicFn() {
    setVerifyMnemonic(true);
    setBackupMnemonic(false);

    if (
      JSON.parse(localStorage.getItem('accounts'))[0].mnemonic ===
      seed.current.value
    ) {
      window.location.replace('/wallet/');
    }
  }

  return (
    <div className="max-w-lg mx-auto my-5">
      {backupMnemonic ? (
        <>
          <WalletSteps step={2} title="Backup secret seed phrase" />
          <div className="mt-3">
            <div className="mt-1">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <div className="text-gray-200 text-lg font-semibold">
                    Secret Recovery Phrase
                  </div>
                  <div className="mt-2">
                    <div className="text-gray-200 text-sm">
                      Your Secret Recovery Phrase makes it easy to back up and
                      restore your account.
                    </div>
                  </div>
                  <div className="mt-2 p-2 space-x-2 rounded border border-orange-400 flex items-center">
                    <div>
                      <ExclamationIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-xs text-gray-200">
                      Never disclose your Secret Recovery Phrase. Anyone with
                      this phrase can take your Ether forever.
                    </div>
                  </div>
                  <div className="mt-4 relative p-4 pb-8 space-x-2 rounded border border-gray-500 flex items-center">
                    <div className="text-sm select-text font-mono selection:bg-emerald-600 selection:text-white text-gray-200">
                      {wallet.mnemonic.phrase || 'Loading...'}
                    </div>
                    <div className="absolute right-1 bottom-1">
                      <button
                        className="relative rounded inline-block text-sm font-medium text-emerald-600 group active:text-emerald-500 focus:outline-none focus:ring-0"
                        onClick={copyToClipboard}
                      >
                        <span
                          className={`absolute rounded inset-0 transition-transform translate-x-0 translate-y-0 ${
                            copied ? 'bg-emerald-400' : 'bg-gray-500'
                          } group-hover:translate-y-0.5 group-hover:translate-x-0.5`}
                        ></span>

                        <span
                          className={`relative rounded block px-2 py-0.5 bg-gray-600 border ${
                            copied ? 'text-emerald-400' : 'text-gray-300'
                          } border-current`}
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={verifyMnemonicFn}
                className="relative inline-flex items-center px-6 py-2 overflow-hidden text-white bg-emerald-600 active:bg-emerald-700 rounded group focus:outline-none focus:ring-0"
              >
                <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>

                <span className="text-sm font-medium transition-all group-hover:mr-4">
                  Continue
                </span>
              </button>
            </div>
          </div>
        </>
      ) : verifyMnemonic ? (
        <>
          <WalletSteps step={3} title="Confirm secret seed phrase" />
          <button
            onClick={() => {
              setVerifyMnemonic(false);
              setBackupMnemonic(true);
            }}
            className="flex w-fit mt-1 items-center py-1 text-sm font-semibold space-x-1 text-gray-200"
          >
            <ArrowSmLeftIcon className="w-4 h-4" />
            <p>Go back</p>
          </button>
          <div className="mt-3">
            <div className="mt-1">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <div className="text-gray-200 text-lg font-semibold">
                    Confirm your Secret Recovery Phrase
                  </div>
                  <div className="mt-2">
                    <div className="text-gray-200 text-sm">
                      Please select each phrase in order to make sure it is
                      correct.
                    </div>
                  </div>
                  <textarea
                    cols={4}
                    ref={seed}
                    placeholder="Paste your seed phrase here"
                    className="mt-4 text-white w-full placeholder:text-gray-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-gray-600 resize-none p-3 space-x-2 rounded border border-gray-500 flex items-center"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={verifyMnemonicFn}
                className="relative inline-flex items-center px-6 py-2 overflow-hidden text-white bg-emerald-600 active:bg-emerald-700 rounded group focus:outline-none focus:ring-0"
              >
                <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>

                <span className="text-sm font-medium transition-all group-hover:mr-4">
                  Confirm
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
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
                      htmlFor="checkbox-1"
                      className="text-sm ml-3 font-medium text-gray-200"
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
        </>
      )}
    </div>
  );
}

export default SetupWallet;
