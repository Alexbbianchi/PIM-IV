import { createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';
import Filter from './pages/Filter';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login, 
        List,
        Book,
        Filter
    })
)

export default Routes;