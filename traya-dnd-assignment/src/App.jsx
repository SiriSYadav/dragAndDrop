import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'
import './App.css'
import SourceArea from './components/source/source.component'
import TargetArea from './components/target/target.component'

function App() {
  const [draggableItems, setDraggableItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ])

  const [droppedItems, setDroppedItems] = useState([])

  const handleDrop = (items) => {
    if (!Array.isArray(items)) {
      items = [items]
    }
    setDroppedItems((prevItems) => [...prevItems, ...items])
    setDraggableItems((prevItems) =>
      prevItems.filter(
        (item) => !items.some((droppedItem) => droppedItem.id === item.id),
      ),
    )
  }

  const handleReturn = (returnedItem) => {
    setDraggableItems((prevItems) => [...prevItems, returnedItem])
    // const updatedItems = droppedItems.filter((_, i) => i !== returnedItem.index)
    // setDroppedItems(updatedItems)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gridContainer">
        <div className="container">
          <SourceArea
            draggableItems={draggableItems}
            setDraggableItems={setDraggableItems}
            onDrop={handleDrop}
          />
        </div>
        <div className="targetContainer">
          <TargetArea
            droppedItems={droppedItems}
            onDrop={handleDrop}
            onReturn={handleReturn}
          />
        </div>
      </div>
    </DndProvider>
  )
}

App.propTypes = {
  draggableItems: PropTypes.array,
  droppedItems: PropTypes.array,
}

export default App
