import { FC } from 'react';
import { Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from '../../routes';

export const Auth: FC<RouteComponentProps> = () => {
  return (
    <Switch>
        {routes.map((item, key) => (
            item.layout === "auth" ?
            <Route
                key={key}
                exact={true}
                path={`/${item.layout}${item.path}`}
                component={item.component}
            />
            : null
        ))}
    </Switch>
  );
}