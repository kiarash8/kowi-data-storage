import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import Login from "./components/auth/login";
import Setting from './components/setting';
import Task from './components/tasks/task';
import TaskList from './components/tasks/task-list';

interface Route {
    path: string;
    component: any;
    layout: string;
}
  
const Routes: Array<Route> = [
    {
        path: '/login',
        component: Login,
        layout: 'auth'
    },
    {
        path: '/setting',
        component: Setting,
        layout: 'main'
    },
    {
        path: "/tasks",
        component: TaskList,
        layout: 'main'
    },
    {
        path: "/tasks/new",
        component: Task,
        layout: 'main'
    },
    {
        path: "/tasks/detail/:id",
        component: Task,
        layout: 'main'
    },
];

export function useRouter() {
    return useContext(RouterContext);
};

export default Routes;