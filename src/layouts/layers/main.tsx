import { FC } from 'react';
import { Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from '../../routes';
import Menu from '../common/menu';

export const Main: FC<RouteComponentProps> = () => {

    return (
      <div>
        <main>
          <Menu />
            <Switch>
              {routes.map((item, key) => (
                item.layout === "main" &&
                <Route
                    key={key}
                    exact={true}
                    path={`/${item.layout}${item.path}`}
                    component={item.component}
                />
              ))}
            </Switch>
          </main>
      </div>
    );
}