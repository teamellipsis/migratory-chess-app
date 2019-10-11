import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
        paddingTop: 56,
        "@media (min-width:0px) and (orientation: landscape)": {
            paddingTop: 48,
        },
        "@media (min-width:600px)": {
            paddingTop: 64,
        },
    },
    grow: {
        flexGrow: 1,
    },
};

function TopBar(props) {
    const { classes, resetOnClick } = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {"Chess"}
                    </Typography>
                    <Button onClick={resetOnClick} color="inherit">Reset</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    resetOnClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
