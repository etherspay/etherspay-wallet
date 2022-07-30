import React, { useRef, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';
import ETPIcon from '../assets/logo512.png';

const bcrypt = require('bcryptjs');

function WalletLogin() {
  const pwd = useRef();

  const [wrongPass, setWrongPass] = useState(false);

  async function verifyPassword() {
    setWrongPass(false);
    bcrypt
      .compare(pwd.current.value, localStorage.getItem('walletPassword'))
      .then((res) => {
        if (res) {
          window.location.replace('/wallet/');
        } else {
          setWrongPass(true);
        }
      });
  }
  return (
    <div className="max-w-lg mx-auto my-16">
      <div className="mt-3 flex text-center justify-center items-center flex-col">
        <div className="mt-2">
          <img
            src={ETPIcon}
            alt="Etherspay Wallet"
            className="w-32 -rotate-6"
          />
          <div className="text-gray-200 text-lg font-semibold mt-4">
            Welcome back!
          </div>
          <div className="text-gray-200 text-sm">Etherspay Wallet</div>
        </div>
        {wrongPass ? (
          <div className="text-start mt-5">
            <p class="text-red-400 text-xs">Incorrect password</p>
          </div>
        ) : (
          <div className="mt-5" />
        )}
        <div className="mt-1 flex rounded-md shadow-xl">
          <input
            ref={pwd}
            type="password"
            placeholder="Password"
            name="pwd"
            id="pwd"
            className={`block placeholder:font-medium placeholder:text-gray-400 text-gray-200 border-2 w-full flex-1 bg-gray-600 rounded-md ${
              wrongPass ? 'border-red-400' : 'border-gray-400'
            } focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm`}
            required
          />
        </div>
        <div className="mt-5">
          <button
            onClick={verifyPassword}
            className="relative inline-flex items-center px-6 py-2 overflow-hidden text-white bg-emerald-600 active:bg-emerald-700 rounded group focus:outline-none focus:ring-0"
          >
            <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
              <ArrowRightIcon className="w-4 h-4" />
            </span>

            <span className="text-sm font-medium transition-all group-hover:mr-4">
              Unlock
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletLogin;
