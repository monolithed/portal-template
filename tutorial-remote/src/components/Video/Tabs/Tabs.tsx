import React from 'react';

import { Tabs as ConstaTabs } from '@consta/uikit/Tabs';
import { useAtom, useAction } from '@reatom/react';

import { currentVideoAtom, items, changeVideoAction, Item } from '../atoms';

type Props = JSX.IntrinsicElements['section'];

const Tabs: React.FunctionComponent<Props> = (props) => {
    const onChange = useAction(({ value }: { value: Item }) => changeVideoAction(value));
    const value = useAtom(currentVideoAtom);

    return (
        <ConstaTabs
            items={items}
            onChange={onChange}
            getLabel={(item) => item.name}
            value={value}
        />
    );
};

export { Tabs };
