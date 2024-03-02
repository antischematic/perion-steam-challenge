import styles from './virtual-list.module.scss';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useRef,
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { List } from '../list/list';
import classNames from 'classnames';
import { mergeRefs } from '@perion.steam.challenge/utils';

/* eslint-disable-next-line */
export interface VirtualScrollProps<T>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'children'
  > {
  items: T[];
  children: (item: T) => ReactElement;
  estimateSize: number;
}

export function VirtualList<T>({
  items,
  children,
  estimateSize,
  className,
  ref,
  ...rest
}: VirtualScrollProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualiser = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
  });

  return (
    <div
      className={classNames(styles.host, className)}
      ref={mergeRefs([parentRef, ref])}
      {...rest}
    >
      <List
        className={styles.list}
        style={{
          display: 'block',
          height: `${rowVirtualiser.getTotalSize()}px`,
          margin: 0,
        }}
      >
        {rowVirtualiser.getVirtualItems().map((virtualItem) => {
          const child = children(items[virtualItem.index]);
          return React.cloneElement(child, {
            key: virtualItem.key,
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
              ...child.props.style,
            },
          });
        })}
      </List>
    </div>
  );
}
