import {ChangeEvent, useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme, Paper, Tabs, Tab, Divider, Grid, Typography, IconButton } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Storage } from '../../storage';
import { useRouter } from '../../routes';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    maxWidth: '800px',
    marginTop: theme.spacing(2),
    margin: '0 auto',
  },
  title:{
    padding: theme.spacing(2),
    color: theme.palette.primary.main
  },
  logout:{
    marginRight: `${theme.spacing(1)}!important`
  }
}));

export default function Menu() {
  const classes = useStyles();
  const { state, dispatch } = useContext(Storage.Context);

  const defaultMenu = 'tasks';
  const location = window.location.hash.split('/');
  const activeMenu = (location.length >= 2 ? location[1] : defaultMenu);
  const [tab, setTab] = useState(activeMenu);
  const { history } = useRouter();

  const handleChange = (_event: ChangeEvent<{}>, value: any) => {
    setTab(value);
    history.push(`/main/${value}`);
  };

  const logout = () => {
    Storage.Action('RESET', dispatch, 'user');
  }

  return (
    <Paper square className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title} variant="h6">{state.general.title}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={logout}
            className={classes.logout}
            color="error">
            <LogoutIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
        >
        <Tab
            value="tasks"
            icon={<DoneAllIcon />}
            aria-label="List" />
        <Tab
            value="setting"
            icon={<SettingsIcon />}
            aria-label="Settings" />
        </Tabs>
    </Paper>
  );
}
