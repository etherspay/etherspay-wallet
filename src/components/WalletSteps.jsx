import React from 'react';

function WalletSteps(props) {
  return (
    <div>
      <p class="text-xs font-medium text-gray-200">
        {props.step}/2 - {props.title}
      </p>
      <div class="mt-1 overflow-hidden bg-gray-500 rounded-full">
        <div class={`w-${props.step}/2 h-2 bg-emerald-500 rounded-full`}></div>
      </div>
    </div>
  );
}

export default WalletSteps;
