import React from "react";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
import SnackBar from "./SnackMessage";
import Chess from "chess.js";

class ChessGame extends React.Component {
    state = {
        fen: "start",
        dropSquareStyle: {},
        squareStyles: {},
        pieceSquare: "",
        history: [],
        openSnack: false,
        snackMsg: "",
    };

    constructor(props) {
        super(props);

        this.game = new Chess();

        this.getFenState().then((fen) => {
            this.setState({ fen });
            this.game.load(fen);
        }).catch((err) => {
            console.log(err);
        });
    }

    @Daemon()
    getFenState() { }

    @Daemon()
    setFenState(state) { }

    onDrop = ({ sourceSquare, targetSquare }) => {
        if (sourceSquare === targetSquare) {
            return;
        }

        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move === null) {
            this.handleSnackOpen("Illegal move.");
            return;
        }

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }), this.saveFenState);

        setTimeout(() => {
            this.makeRandomMove();
        }, 250);
    };

    makeRandomMove = () => {
        var possibleMoves = this.game.moves()

        if (possibleMoves.length === 0) {
            this.handleGameOver("Black");
            return;
        }

        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        this.game.move(possibleMoves[randomIdx])

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }), this.saveFenState);

        if (this.game.in_check()) {
            this.handleSnackOpen("Check.");
        }

        if (this.game.game_over()) {
            this.handleGameOver("White");
        }
    };

    saveFenState = () => {
        this.setFenState(this.game.fen()).catch((err) => {
            console.log(err);
        });
    };

    onDragOverSquare = square => {
        this.setState({
            dropSquareStyle:
                square === "e4" || square === "d4" || square === "e5" || square === "d5"
                    ? { backgroundColor: "cornFlowerBlue" }
                    : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
        });
    };

    resetOnClick = () => {
        this.setFenState("start").then(() => {
            this.setState({
                fen: "start",
                dropSquareStyle: {},
                squareStyles: {},
                pieceSquare: "",
                history: [],
            });
            this.game.reset();
            this.handleSnackOpen("Game reseted.");
        }).catch((err) => {
            console.log(err);
        });
    };

    handleSnackOpen = (snackMsg) => {
        this.setState({ openSnack: true, snackMsg });
    };

    handleSnackClose = () => {
        this.setState({ openSnack: false });
    };

    handleGameOver = (side) => {
        if (this.game.in_checkmate()) {
            this.handleSnackOpen(`Game over. ${side} is checkmated.`);
        } else if (this.game.in_stalemate()) {
            this.handleSnackOpen(`Game over. ${side} is stalemated.`);
        } else if (this.game.in_draw() || this.game.in_threefold_repetition()) {
            this.handleSnackOpen(`Game is drawn.`);
        } else if (this.game.insufficient_material()) {
            this.handleSnackOpen(`Game is drawn due to insufficient material.`);
        }
    };

    render() {
        const { fen, dropSquareStyle, squareStyles, openSnack, snackMsg } = this.state;

        return (
            <React.Fragment>
                <TopBar resetOnClick={this.resetOnClick} />
                <SnackBar
                    open={openSnack}
                    onClose={this.handleSnackClose}
                    message={snackMsg}
                />
                {this.props.children({
                    squareStyles,
                    position: fen,
                    onDrop: this.onDrop,
                    dropSquareStyle,
                    onDragOverSquare: this.onDragOverSquare,
                })}
            </React.Fragment>
        );
    }
}

ChessGame.propTypes = {
    children: PropTypes.func,
};

export default ChessGame;

const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        })
    };
};
