import React from 'react';
import dynamic from 'next/dynamic';

const Chessboard = dynamic(
    () => import('chessboardjsx'),
    { ssr: false }
)

const ChessGame = dynamic(
    () => import('../components/ChessGame'),
    { ssr: false }
)

class Index extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ChessGame>
                    {({
                        position,
                        onDrop,
                        squareStyles,
                        dropSquareStyle,
                        onDragOverSquare,
                    }) => (
                            <Chessboard
                                id="Chessboard"
                                width={320}
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
                        )}
                </ChessGame>
            </div>
        );
    }
}

export default Index;
