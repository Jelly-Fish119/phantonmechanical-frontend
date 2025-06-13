import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Popover, { PopoverProps } from '@mui/material/Popover';

// ----------------------------------------------------------------------

interface MenuPopoverProps extends PopoverProps {
  arrow?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom';
}

const MenuPopover = forwardRef<HTMLDivElement, MenuPopoverProps>(
  ({ children, arrow = 'top-right', sx, ...other }, ref) => {
    const getArrowPosition = () => {
      const [vertical, horizontal] = arrow.split('-');
      return {
        top: vertical === 'bottom' ? '100%' : 'auto',
        bottom: vertical === 'top' ? '100%' : 'auto',
        left: horizontal === 'right' ? '100%' : 'auto',
        right: horizontal === 'left' ? '100%' : 'auto',
      };
    };

    return (
      <Popover
        ref={ref}
        anchorOrigin={{
          vertical: arrow.includes('top') ? 'bottom' : 'top',
          horizontal: arrow.includes('left') ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: arrow.includes('top') ? 'top' : 'bottom',
          horizontal: arrow.includes('left') ? 'left' : 'right',
        }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: 'inherit',
            ...sx,
          },
        }}
        {...other}
      >
        {arrow && (
          <Box
            sx={{
              position: 'absolute',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'rotate(45deg)',
              ...getArrowPosition(),
            }}
          />
        )}

        {children}
      </Popover>
    );
  }
);

export { MenuPopover };
