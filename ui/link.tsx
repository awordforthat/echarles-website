// framework
import * as React from 'react';

// css
import theming from '../styles/theming.module.scss';

interface ILinkProps {
  text: string;
  target: string;
  download?: boolean;
}

export function Link({ text, target, download }: ILinkProps) {
  return (
    <a className={theming.link} href={target} download={download}>
      {text}
    </a>
  );
}
