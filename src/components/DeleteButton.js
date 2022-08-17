import React from 'react';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
export default function DeleteButton() {
  return (
    <Link href={''}>
      <a>
        <DeleteIcon className='cursor-pointer'></DeleteIcon>
      </a>
    </Link>
  );
}
