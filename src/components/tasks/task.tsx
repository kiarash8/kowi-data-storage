import React, { useContext, FC, useState } from 'react';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Theme, Box, Grid, Button, TextField, Card, CardHeader, CardActions, CardContent, Switch } from '@mui/material';
import { Storage } from '../../storage';
import { useRouter } from '../../routes';
import { Utilities } from '../../shared/utilities';
import { IField } from '../../shared/type';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: '800px',
        marginTop: theme.spacing(2),
        margin: '0 auto',
      },
      cardContent: {
        paddingBottom:'8px!important'
      },
      header: {
        width: '100%',
        color: theme.palette.primary.dark,
        '& .MuiCardHeader-title':{
            fontSize: '1rem'
        },
        '& .MuiCardHeader-action':{
            marginRight: theme.spacing(4),
            marginTop: '0px',
        }
    },
}));

const Task: FC<RouteComponentProps<{id?: string}>> = ({ match }) => {
    const classes = useStyles();
    const { history } = useRouter();
    const params = match.params;
    const id = params ? params.id : null;
    const { state, dispatch } = useContext(Storage.Context);
    const [fields, setFields] = useState<IField>({
        title: {
            type: 'text',
            value: '',
            validation: false,
            required: true
        },
        description: {
            type: 'text',
            value: '',
            validation: false,
            required: true
        },
    });
    const [checked, setChecked] = useState(false);

    const handleChecked = (event: React.ChangeEvent<any>) => {
        setChecked(event.target.checked);
    };
    
    const handleChange = (event: React.ChangeEvent<any>, field: string) => {
        const value = fields[field].type === 'text' ? event.target.value : event.target.checked;
        setFields({
          ...fields,
          [field]: {
            ...fields[field],
            value: value,
            validation: false,
          }
        });
    };

    React.useEffect(() => {
        if(id){
          getData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getData = () => {
        const tasks = state.task.items;
        const index = tasks.findIndex(x=> x.id === id);
        if(index > -1){
            const item = tasks[index];
            setFields({
                ...fields,
                title: {
                    ...fields.title,
                    value: item.title,
                },
                description: {
                    ...fields.description,
                    value: item.description,
                }
            });
            setChecked(item.checked);
        }
        else{
            history.push('/main/tasks');
        }
    }

    function save(){ 
        if(Utilities.validation(fields)){
            id ? edit() : add();
        }
        else{
            setFields(Utilities.fieldsValidation(fields));
        }
    }
    function add(){
        Storage.Action('SET', dispatch, 'task', {
            items: [
                ...state.task.items,
                {
                    id: Utilities.uuidv4(),
                    title: fields.title.value,
                    description: fields.description.value,
                    checked: false
                }
            ]
        })
        history.push('/main/tasks');

    }
    function edit(){
        const tasks = state.task.items;
        const index = tasks.findIndex(x=> x.id === id);
        tasks[index] = {
            ...tasks[index],
            title: fields.title.value,
            description: fields.description.value,
            checked: checked
        }

        Storage.Action('SET', dispatch, 'task', { items: tasks });
        history.push('/main/tasks'); 
    }

    return (
        <Box justifyContent="center">
            <Card className={classes.card}>
                <CardHeader
                    className={classes.header}
                    title={id ? 'Edit task' :  'Create new task'}
                    action={
                        id ?
                        <Switch
                            checked={checked}
                            onChange={handleChecked}
                        />
                        : null
                    }
                />
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                value={fields.title.value}
                                onChange={e => handleChange(e, 'title')}
                                error={fields.title.validation}
                                label="Title"
                                variant="outlined"
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={fields.description.value}
                                onChange={e => handleChange(e, 'description')}
                                error={fields.title.validation}
                                label="Description"
                                multiline
                                rows="4"
                                variant="outlined"
                                fullWidth
                                />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-start">
                            <Grid item>
                                <Button component={RouterLink} to={'/main/tasks'}>
                                    back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={() => save()}
                                    variant="contained"
                                    color="primary">
                                    {id ? 'edit' : 'add'}
                                </Button>          
                            </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Box>   
    );
}

export default Task;
