import styles from './avatar.module.scss';
import Image from 'next/image'
import defaultImage from './no-image.png'

/* eslint-disable-next-line */
export interface AvatarProps {
  src?: string
  alt?: string
}

export function Avatar({src, alt}: AvatarProps) {
  if (!src) return <Image src={defaultImage} alt="No image" width={48} height={48} />
  return (
    <img src={src} alt={alt} />
  );
}
