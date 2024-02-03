import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useToast, useToastComponent } from '.';
import type { FuctToastOption } from './types';

export const useFuctToast = () => {
  return useToast<FuctToastOption>();
};

const FuctToast = () => {
  const { isOpen, message, options } = useToastComponent<FuctToastOption>();
  const [isDisappear, setIsDisappear] = useState(false);

  useEffect(() => {
    return () => {
      setIsDisappear(false);
    };
  }, [isOpen]);

  if (!isOpen && isDisappear) return null;

  return (
    <ToastWrapper
      $isOpen={isOpen}
      $color={options?.color}
      $position={options?.position}
      onAnimationEnd={(e) => {
        if (e.animationName === toastClose.name) {
          setIsDisappear(true);
        }
      }}
    >
      {message}
    </ToastWrapper>
  );
};

const toastOpen = ($position: FuctToastOption['position']) => keyframes`
  0% {
    ${$position || 'bottom'}: 0;
    opacity: 0;
  }
  100% {
    ${$position || 'bottom'}: 40px;
    opacity: 1;
  }
`;

const toastClose = ($position: FuctToastOption['position']) => keyframes`
  0% {
    ${$position || 'bottom'}: 40px;
    opacity: 1;
  }
  100% {
    ${$position || 'bottom'}: 0;
    opacity: 0;
  }
`;

const ToastWrapper = styled.div<{ $isOpen: boolean; $color?: FuctToastOption['color']; $position?: FuctToastOption['position'] }>`
  position: absolute;
  padding: 4px 8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  ${({ $color }) => {
    switch ($color) {
      case 'blue':
        return css`
          background: #94e7ff;
          color: #006691;
        `;
      case 'red':
        return css`
          background: #f1666d;
          color: #610000;
        `;
      default:
        return css`
          background: #5ccda7;
          color: #003817;
        `;
    }
  }}
  animation: ${({ $isOpen, $position }) => ($isOpen ? toastOpen($position) : toastClose($position))} 500ms 0s ease-in-out normal forwards;
`;

export default FuctToast;
