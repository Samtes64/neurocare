import React from 'react'

import { Icon } from '@iconify/react';
function SearchBar() {
  return (
    <div className="flex max-w-sm items-center border-2 m-10">
      <input className="w-[340px] p-[4px]" type='text' placeholder='search.....' />
      <button className='text-3xl border-l-4 border-blue-400 bg-gray-300'><Icon icon="ic:sharp-search" /></button>
    </div>
  )
}

export default SearchBar;

