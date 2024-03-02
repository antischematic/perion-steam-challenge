import styles from './avatar.module.scss';
import Image, { ImageProps } from 'next/image';
import defaultImageData from './no-image.png';
import { useState } from 'react';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface AvatarProps
  extends Omit<ImageProps, 'src' | 'children' | 'alt'> {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt, className, ...rest }: AvatarProps) {
  const [error, setError] = useState(false);
  const defaultImage = (
    <Image
      className={classNames(styles.host, className)}
      src={defaultImageData}
      alt={alt ?? 'No image'}
      {...rest}
    />
  );
  const image = (
    <img src={src} alt={alt} onError={() => setError(true)} {...rest} />
  );
  return (
    <div className={classNames(styles.host, className)}>
      {src && !error ? image : defaultImage}
    </div>
  );
}
