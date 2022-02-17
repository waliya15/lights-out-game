import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows : 5 ,
    ncols : 5 ,
    chanceLightStartsOn : true
  }

  constructor(props) {
    super(props);
    this.state = {
      board : this.createBoard() , 
      hasWon : false
    }
    this.flipCellsAround = this.flipCellsAround.bind(this)
    // this.createBoard = this.createBoard.bind(this)
    // this.litOrNot = this.litOrNot.bind(this)
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // TODO: create array-of-arrays of true/false values
    var board = [];
    for(let i  = 0 ; i < this.props.nrows ; i++){
      var row = []
      for(let j  = 0 ; j < this.props.ncols ; j++){
        const isLit = Math.floor(Math.random() * 2) === 0 ? false : true
        row.push(isLit)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log(coord)
    console.log(x , y)


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        console.log(x , y)
        console.log(board[x][y])
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y , x)
    flipCell(y , x + 1)
    flipCell(y , x - 1)
    flipCell(y + 1 , x)
    flipCell(y - 1 , x)

    const hasWon = board.every(row => row.every(cell => !cell))

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board : board , hasWon : hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon){
      return <h1 className = ''> YOU WON BABY !</h1>
    }
    return(
      <div>
        <div className = 'container'>
          <div className = 'neon'>Lights</div>
          <div className = 'flux'>Out</div>
        </div>
        <table className = 'Board'>
        <tbody>
        {this.state.board.map((row , i) => {
          return (
            <tr key = {i}>
              { row.map((col , j) => {
              return <Cell 
                      key = {`${i}-${j}`} 
                      isLit = {this.state.board[i][j]} 
                      flipCellsAroundMe = {this.flipCellsAround}/>
               })}
             </tr>
          )
        })}
        </tbody>
      </table>
      </div>
      
    )
  }
}

export default Board;
