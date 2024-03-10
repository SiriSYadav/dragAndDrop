import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import './target.component.css'
import DraggableItem from '../dragabble-item/dragabble-item.component'
import { useState } from 'react'

const TargetArea = ({ droppedItems, onDrop, onReturn }) => {
  const [items, setItems] = useState(droppedItems)
  const [selectedItems, setSelectedItems] = useState([])
  const toggleSelectItem = (index) => {
    const selectedIndex = selectedItems.indexOf(index)
    if (selectedIndex === -1) {
      setSelectedItems([...selectedItems, index])
    } else {
      const updatedSelectedItems = [...selectedItems]
      updatedSelectedItems.splice(selectedIndex, 1)
      setSelectedItems(updatedSelectedItems)
    }
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'item',
    drop: (droppedItems) => {
      onDrop(droppedItems)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  let backgroundColor = 'white'
  if (isOver) {
    backgroundColor = canDrop ? 'lightgreen' : 'lightcoral'
  }

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]
    setItems((prevItems) => {
      const updatedItems = [prevItems]
      updatedItems.splice(dragIndex, 1)
      updatedItems.splice(hoverIndex, 0, dragItem)
      return updatedItems
    })
  }

  const handleReturnItem = (returnedItem) => {
    const updatedItems = items.filter((item) => item.id !== returnedItem.id)
    console.warn('updated,returned', updatedItems, returnedItem)
    setItems(updatedItems)
    onReturn(returnedItem)
  }

  return (
    <div ref={drop} className="container" style={{ backgroundColor }}>
      <h2>Target Area</h2>
      {isOver && canDrop && <p>Drop here</p>}
      {isOver && !canDrop && <p>Cannot drop here</p>}
      <ul>
        {droppedItems.map((item, index) => (
          // <li key={item.id}>{item.name}</li>
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            onDrop={onDrop}
            moveItem={moveItem}
            onReturn={handleReturnItem}
            isSelected={selectedItems.includes(index)}
            onSelect={() => toggleSelectItem(index)}
          />
        ))}
      </ul>
    </div>
  )
}

TargetArea.propTypes = {
  droppedItems: PropTypes.array,
  onDrop: PropTypes.func.isRequired,
  onReturn: PropTypes.func.isRequired,
}

export default TargetArea
