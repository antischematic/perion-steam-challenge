import { render } from '@testing-library/react';

import {VirtualList} from './virtual-list';

describe('VirtualScroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VirtualList items={[]} estimateSize={10}>{() => <div />}</VirtualList>);
    expect(baseElement).toBeTruthy();
  });
});
