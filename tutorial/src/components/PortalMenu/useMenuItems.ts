import {Item} from '@consta/uikit/__internal__/src/components/Header/Menu/HeaderMenu';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../routes';

enum Menu {
    ABOUT = 'Локальный модуль',
    VIDEO = 'Динамический модуль',
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
    const history = useHistory();
    const {pathname} = useLocation();

    return items.map((item) => ({
        ...item,
        active: pathname.indexOf(item.href || '') === 0,
        onClick: (event) => {
            const {href = Routes.HOME} = item;

            history.push(href);

            event.preventDefault();
        }
    }));
};

export {useMenuItems};
