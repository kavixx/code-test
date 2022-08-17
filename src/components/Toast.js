import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function Tosat() {
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        message='Successful'
        key={vertical + horizontal}
      />
    </>
  );
}
