import { useState } from 'react'
import './App.css'


interface TCell {
  row: number,
  column: number
}


function App() {

  const [grid, setGrid] = useState([
    [0, 1, 3, 3],
    [5, 2, 4, 2],
    [5, 4, 1, 0]
  ])
  const [isReveled, setIsReveled] = useState(
    new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false))
  )

  const [firstItem, setFirstItem] = useState<TCell>()

  //Clicar e o numero deve aparecer
  //Clicar novamente e um segundo numero deve aparecer
  //comprar os dois numeros
  //se igual success se errado voltar os que abriram 

  function handleSelectedCard(row: number, column: number) {
    if (isReveled[row][column]) return

    const clickedNumber = grid[row][column]
    const newisReveled = [...isReveled]

    newisReveled[row][column] = true

    setIsReveled(newisReveled)


    if (firstItem) {
      const firstNumberChoosed = grid[firstItem.row][firstItem.column]
      if (firstNumberChoosed !== clickedNumber) {
        setTimeout(() => {
          newisReveled[firstItem.row][firstItem.column] = false
          newisReveled[row][column] = false
          setIsReveled([...newisReveled])
        }, 400)
      } else {
        const youWon = isReveled.flat().every((state) => state === true)
        if (youWon) {
          setTimeout(() => {
            alert('Você ganhou, parabéns!')

          }, 500)
        }
      }
      setFirstItem(undefined)

    } else {
      setFirstItem({
        row,
        column
      })
    }

  }



  console.log(isReveled)
  return (
    <div className="App">
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((number, columIndex) => (
              <div
                className={
                  'card ' + (isReveled[rowIndex][columIndex] ? 'cliked' : '')
                }
                key={columIndex}
                onClick={() => handleSelectedCard(rowIndex, columIndex)}
              >
                {isReveled[rowIndex][columIndex] ? number : ""}

              </div>
            ))}



          </div>
        )
        )}

      </div>
    </div>
  )
}

export default App
