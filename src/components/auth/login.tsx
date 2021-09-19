import { FC, useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Theme, CircularProgress, Box, Card, CardContent, Button, Grid, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Collapse, Alert, AlertColor } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { useRouter } from '../../routes';
import { Storage } from '../../storage';

const useStyles = makeStyles((theme: Theme) => ({
  logo:{
    width: '128px',
    height: '64px'
  },
  card: {
    maxWidth: '400px',
    marginTop: '48px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
  },
  header:{
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  subtitle:{
    fontSize: '.8rem',
    fontWeight: 400,
  },
  cardContent: {
    paddingBottom:'8px!important'
  },
  cardAction:{
    margin: theme.spacing(1,0),
  },
  button: {
    padding: theme.spacing(1.5),
  },
  alert:{
    marginTop: theme.spacing(1)
  },
  inputLabel:{
    fontSize: '0.8125rem',
    textAlign: 'left',
    paddingBottom: theme.spacing(1.5)
  },
  textField: {
    flexBasis: 200,
    marginBottom:theme.spacing(3),
  },
  loading: {
    width: '22px!important',
    height: '22px!important',
  }
}));

const Login: FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const { dispatch } = useContext(Storage.Context);

  const [fields, setFields] = useState({
    username:{
      value: '',
      validation:false
    },
    password:{
      value: '',
      validation:false
    },
  });
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [alert, setAlert] = useState<{ 
    show: boolean;
    message: string;
    severity: AlertColor;
  }>({
    show: false,
    message: '',
    severity: 'warning'
  });

  const handleFieldChange = (name:string, event:any) => {
    setFields({
        ...fields,
        [name]: {
            value: event.target.value,
            validation: false
        }
    });
  };

  const handleClickShowPassword = () => { setShowPassword(!showPassword) };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };


  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if(fields.username.value === 'admin' && fields.password.value === 'admin'){
        Storage.Action('SET', dispatch, 'user', {token: '#token', name: 'kia'});
        history.push('/main/tasks')
        window.location.reload();
      }
      else{
        setAlert({
          show: true,
          message: 'username or password is incorrect!',
          severity: 'warning'
        })
        setFields({
          username: {
              ...fields.username,
              validation: true
          },
          password: {
            ...fields.password,
            validation: true
        }
      });
      }
    }, 2000);
  }

  return (
    <Box justifyContent="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
                <div className={classes.header}>
                  <Logo className={`${classes.logo} MuiSvgIcon-root`} />
                  <Typography component="h6" gutterBottom>login in to your account</Typography>
                  <Typography className={classes.subtitle} component="div" gutterBottom>(Username: admin, Password: admin)</Typography>
                </div>
                  <InputLabel className={classes.inputLabel}>Username</InputLabel>
                  <OutlinedInput
                    fullWidth
                    className={clsx(classes.textField)}
                    value={fields.username.value}
                    placeholder="enter your username"
                    onChange={e => handleFieldChange('username', e)}
                    error={fields.username.validation}
                    startAdornment={<InputAdornment position="start"><AccountCircle color="action" /></InputAdornment>}
                />
                  <InputLabel className={classes.inputLabel}>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    className={clsx(classes.textField)}
                    value={fields.password.value}
                    placeholder="enter your password"
                    onChange={e => handleFieldChange('password', e)}
                    error={fields.password.validation}
                    startAdornment={<InputAdornment position="start"><Lock color="action" /></InputAdornment>}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                />
                <Grid className={classes.cardAction} container>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => login()}
                      disabled={fields.username.value === '' || fields.password.value === '' || loading === true}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="small">
                        {loading ?
                          <CircularProgress
                          color="inherit"
                          className={classes.loading} /> : 'Login'}
                      </Button>
                  </Grid>
                  <Grid item xs={12}>
                  <Collapse in={alert.show}>
                    <Alert
                      className={classes.alert}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setAlert({
                              ...alert,
                              show: false
                            })
                          }}
                        >
                          <Close fontSize="inherit" />
                        </IconButton>
                      }
                    severity={alert.severity}>{alert.message}</Alert>
                  </Collapse>
                  </Grid>
                </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
