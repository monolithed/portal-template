import {useState} from 'react';
import {Item} from '@consta/uikit/__internal__/src/components/Header/Menu/HeaderMenu';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../routes';

enum Menu {
    ABOUT = 'Локальный модуль',
    VIDEO = 'Динамический модуль'
}

const items: Item[] = [
    {
        label: Menu.ABOUT,
        href: Routes.ABOUT,
        active: true
    },
    {
        label: Menu.VIDEO,
        href: Routes.TUTORIAL
    }
];

const useMenuItems = (): Item[] => {
    const {pathname} = window.location;
    const [currentItem, setCurrentItem] = useState<string>(pathname);
    let history = useHistory();

    return items.map((item) => ({
        ...item,
        active: item.href === currentItem,
        onClick: (event) => {
            const {href = Routes.HOME} = item;

            setCurrentItem(href);
            history.push(href);

            event.preventDefault();
        }
    }));
};

export {useMenuItems};
