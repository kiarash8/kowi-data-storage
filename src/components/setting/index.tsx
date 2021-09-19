import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';
import { Theme, TextField, CardActions, Button, FormControlLabel, Checkbox, Grid, Box, Card, CardContent } from '@mui/material';
import { Storage } from '../../storage';
import { IField } from '../../shared/type';
import { Utilities } from '../../shared/utilities';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: '800px',
    marginTop: theme.spacing(2),
    margin: '0 auto',
  },
  cardContent: {
    paddingBottom:'8px!important'
  },
}));

const Setting: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(Storage.Context);
  const [fields, setFields] = useState<IField>({
    title: {
      type: 'text',
      value: '',
      validation: false,
      required: true
    },
    notification: {
      type: 'checked',
      value: false,
      validation: false,
      required: true
    },
  });
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const values = { title: fields.title.value, notification: fields.notification.value };
    const isEqual = _.isEqual(values, state.general);
    if(isEqual !== isChange)
      setIsChange(isEqual);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  useEffect(() => {
    syncData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.general]);

  const syncData = () => {
    setFields({
      ...fields,
      title: {
        ...fields.title,
        value: state.general.title
      },
      notification: {
        ...fields.notification,
        value: state.general.notification
      },
    });
  }

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

  const save = () => {
    if(Utilities.validation(fields)){
      Storage.Action('SET', dispatch, 'general', {
        title: fields.title.value,
        notification: fields.notification.value
      });
    }
    else{
      setFields(Utilities.fieldsValidation(fields));
    }
  }

  const reset = () => {
    Storage.Action('RESET', dispatch, 'general');
  }

  return (
    <Box justifyContent="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1}>
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fields.notification.value}
                    onChange={e => handleChange(e, 'notification')}
                    color="primary"
                  />
                }
                label="Get notification"
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
            alignItems="flex-start"
            >
              <Grid item>
                <Button
                  onClick={() => reset()}
                  variant="outlined"
                  color="error">reset to default</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => save()}
                  disabled={isChange}
                  variant="contained"
                  color="primary">save</Button>
              </Grid>
          </Grid>
        </CardActions>
    </Card>
  </Box>
  );
}

export default Setting;
