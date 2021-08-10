import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Layout} from '../Layout';

type LayoutProps = React.ComponentProps<typeof Layout>;

const testId = 'Layout';

const renderComponent = (props: LayoutProps) => {
    return render(<Layout data-testid={testId} {...props} />);
};

function getRender() {
    return screen.getByTestId(testId);
}

describe('Компонент Layout', () => {
    const header = 'header';

    it('Должен рендериться без ошибок', () => {
        expect(() => renderComponent({header: 'header'})).not.toThrow();
    });

    it(`Header отображается`, () => {
        renderComponent({header});
        expect(getRender()).toHaveTextContent(header);
    });

    it(`Children отображается`, () => {
        const children = 'children';

        renderComponent({children, header});
        expect(getRender()).toHaveTextContent(children);
    });
});
