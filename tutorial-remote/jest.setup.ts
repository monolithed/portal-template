import {configure} from '@testing-library/dom'
import ResizeObserver from './__mocks__/ResizeObserver';

configure({
    testIdAttribute: 'data-test-id'
});

jest.mock('resize-observer-polyfill', () => {
    return ResizeObserver;
});
