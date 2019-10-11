import React from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";

class ChessGame extends React.Component {
    state = {
        fen: "start",
        dropSquareStyle: {},
        squareStyles: {},
        pieceSquare: "",
        history: []
    };

    constructor(props) {
        super(props);

        this.game = new Chess();

        this.getFenState().then((fen) => {
            this.setState({ fen });
            this.game = new Chess(fen);
        }).catch((err) => {
            console.log(err);
        });
    }

    @Daemon()
    getFenState() { }

    @Daemon()
    setFenState(state) { }

    onDrop = ({ sourceSquare, targetSquare }) => {
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move === null) return;

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

        if (possibleMoves.length === 0) return

        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        this.game.move(possibleMoves[randomIdx])

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }), this.saveFenState);
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

    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
        });
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
