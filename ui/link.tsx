import * as React from 'react';

import theming from '../styles/theming.module.scss';

interface ILinkProps {
  text: string;
  target: string;
  download?: boolean;
}

export function Link({ text, target }: ILinkProps) {
  return (
    <a className={theming.link} href={target} download>
      {text}
    </a>
  );
}
