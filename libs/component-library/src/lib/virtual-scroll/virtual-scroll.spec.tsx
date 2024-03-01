import { render } from '@testing-library/react';

import VirtualScroll from './virtual-scroll';

describe('VirtualScroll', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VirtualScroll />);
    expect(baseElement).toBeTruthy();
  });
});
