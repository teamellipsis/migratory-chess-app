import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';

const Chessboard = dynamic(
    () => import('chessboardjsx'),
    { ssr: false }
)

const ChessGame = dynamic(
    () => import('../components/ChessGame'),
    { ssr: false }
)

const styles = theme => ({
    chessboard: {
        display: 'flex',
        justifyContent: 'center',
    },
    space: {
        ...theme.mixins.toolbar,
    }
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.spaceRef = React.createRef();
    }

    calcWidth = ({ screenWidth, screenHeight }) => {
        const theme = this.props.theme;

        let mediaMinWidth = 56;
        if (this.spaceRef.current !== null) {
            const rect = this.spaceRef.current.getBoundingClientRect();
            mediaMinWidth = rect.height
        }

        const minHeight = screenHeight - mediaMinWidth - theme.spacing.unit * 2;
        const minWidth = screenWidth - theme.spacing.unit;
        return Math.min(minHeight, minWidth);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ChessGame>
                    {({
                        position,
                        onDrop,
                        squareStyles,
                        dropSquareStyle,
                        onDragOverSquare,
                    }) => (
                            <React.Fragment>
                                <div ref={this.spaceRef} className={classes.space} ></div>
                                <div className={classes.chessboard}>
                                    <Chessboard
                                        id="Chessboard"
                                        calcWidth={this.calcWidth}
                                        position={position}
                                        onDrop={onDrop}
                                        boardStyle={{
                                            borderRadius: "5px",
                                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                                        }}
                                        squareStyles={squareStyles}
                                        dropSquareStyle={dropSquareStyle}
                                        onDragOverSquare={onDragOverSquare}
                                        transitionDuration={50}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                </ChessGame>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Index);
