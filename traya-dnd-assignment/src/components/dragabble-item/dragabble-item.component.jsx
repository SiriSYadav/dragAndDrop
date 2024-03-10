import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'

const DraggableItem = ({
  item,
  index,
  onDrop,
  moveItem,
  isSelected,
  onSelect,
  onReturn,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => ({ type: 'item', ...item, index, isSelected }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'item',
    drop: (droppedItem) => {
      if (index !== droppedItem.index) {
        onDrop(droppedItem.index, index)
      }
    },
    hover: (draggedItem) => {
      if (index !== draggedItem.index) {
        const hoverIndex = index
        moveItem(draggedItem.index, hoverIndex)
        draggedItem.index = hoverIndex
      }
    },
    canDrop: () => true,
  })

  const handleClick = () => {
    if (isSelected && onReturn) {
      onReturn(index)
    } else {
      onSelect(index)
    }
  }

  return (
    <li
      ref={(node) => {
        drag(drop(node))
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        background: isSelected ? 'green' : 'transparent',
        margin: '10px',
      }}
      onClick={handleClick}
    >
      {item.name}
    </li>
  )
}

DraggableItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onReturn: PropTypes.func,
}

export default DraggableItem
