import { useState } from 'react'
import PropTypes from 'prop-types'
import DraggableItem from '../dragabble-item/dragabble-item.component'
import './source.component.css'

const SourceArea = ({ draggableItems, onDrop }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState(draggableItems)

  const handleDrop = () => {
    const droppedItems = selectedItems.map((index) => items[index])
    onDrop(droppedItems)
    setSelectedItems([])
  }

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

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems.splice(dragIndex, 1)
      updatedItems.splice(hoverIndex, 0, dragItem)
      return updatedItems
    })
  }

  return (
    <div className="sourceContainer">
      <h2>Source Area</h2>
      {selectedItems.length > 1 && (
        <button onClick={handleDrop} className="buttonContainer">
          Drop Selected Items
        </button>
      )}
      <ul>
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            onDrop={handleDrop}
            moveItem={moveItem}
            isSelected={selectedItems.includes(index)}
            onSelect={() => toggleSelectItem(index)}
          />
        ))}
      </ul>
    </div>
  )
}

SourceArea.propTypes = {
  draggableItems: PropTypes.array,
  onDrop: PropTypes.func.isRequired,
}

export default SourceArea
