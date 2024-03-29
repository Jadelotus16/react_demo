import React from 'react'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>);
    }

    render() {
        let boards = [];
        for(let i=0;i<15;i++){
            boards.push(
                <div className="board-row">

                    {this.renderSquare(i*15+1)}
                    {this.renderSquare(i*15+2)}
                    {this.renderSquare(i*15+3)}
                    {this.renderSquare(i*15+4)}
                    {this.renderSquare(i*15+5)}
                    {this.renderSquare(i*15+6)}
                    {this.renderSquare(i*15+7)}
                    {this.renderSquare(i*15+8)}
                    {this.renderSquare(i*15+9)}
                    {this.renderSquare(i*15+10)}
                    {this.renderSquare(i*15+11)}
                    {this.renderSquare(i*15+12)}
                    {this.renderSquare(i*15+13)}
                    {this.renderSquare(i*15+14)}
                    {this.renderSquare(i*15+15)}

                </div>
            )
        }


        return (
            <div>
                {boards}
            </div>
        );
    }
}

class fiveInARow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xInNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]), stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'winner:' + winner;
        } else {
            status = 'Next player:' + (this.state.xInNext ? 'X' : 'O');
        }

        return (
            <div>
                <h1>五子棋</h1>
                <div className="game">
                    <div className="game-board">
                        <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                    </div>
                    <div className="game-info">
                        <div> {status} </div>
                        <ol> {moves} </ol>
                    </div>
                </div>
            </div>

        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default fiveInARow
