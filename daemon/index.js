this.getFenState = () => {
    if (!this.fen) this.fen = 'start';
    return this.fen;
};

this.setFenState = (state) => {
    this.fen = state;
};
