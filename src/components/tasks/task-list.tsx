import React, { FC, useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Theme, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Storage } from '../../storage';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: '800px',
        marginTop: theme.spacing(2),
        margin: '0 auto',
    },
        cardContent: {
        paddingBottom:'8px!important'
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TaskList() {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(Storage.Context);

    const handleToggle = (id: string) => {
      const tasks = state.task.items;
      const index = tasks.findIndex(x=> x.id === id);
      tasks[index].checked = !tasks[index].checked;

      Storage.Action('SET', dispatch, 'task', {items: tasks});
    };
  
    return (
        <Box justifyContent="center">
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  {state.task.items.length > 0 ?
                    <List className={classes.list}>
                      {state.task.items.map(item => {
                          const labelId = `checkbox-list-label-${item.id}`;
                          return (
                          <ListItem key={item.id} dense button onClick={() => handleToggle(item.id)}>
                              <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={item.title} />
                              <ListItemSecondaryAction>
                                <TaskItem id={item.id} />
                              </ListItemSecondaryAction>
                          </ListItem>
                          );
                      })}
                    </List>                  
                  : null}
                  <Button
                    component={RouterLink} to={'tasks/new'}
                    fullWidth
                    variant="contained"
                    color="primary">Add new task</Button>
                </CardContent>
            </Card>
        </Box>      
    );
}

export const TaskItem: FC<{id: string}> = ({id}) => {
    const { state, dispatch } = useContext(Storage.Context);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [deleteDialog, setDeleteDialog] = useState(false);
  
    function openMenu(event: any) { setAnchorEl(event.currentTarget); }
    function closeMenu() { setAnchorEl(null); }
    function openDeleteDialog(){
        closeMenu();
        setDeleteDialog(true);
    }
  
    function remove() {
        const tasks = state.task.items;
        const index = tasks.findIndex(x=> x.id === id);
        tasks.splice(index, 1);
        Storage.Action('SET', dispatch, 'task', { items: tasks });
    }
    return (
        <>
        <IconButton
            size="small"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={openMenu}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={closeMenu}
            PaperProps={{
                style: {
                    maxHeight: 48 * 4.5,
                    width: 'auto',
                },
            }}
        >
            <MenuItem component={RouterLink} to={`./tasks/detail/${id}`} >
                <ListItemIcon style={{minWidth:'32px'}}>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem onClick={openDeleteDialog}>
                <ListItemIcon style={{minWidth:'32px'}}>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </MenuItem>
        </Menu>
        <Dialog
            maxWidth="xs"
            open={deleteDialog}
            onClose={() =>  setDeleteDialog(false)}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>You won't able to revert this!</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteDialog(false)} color="secondary">Cancle</Button>
                <Button onClick={() => remove()} color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
