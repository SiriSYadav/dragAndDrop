import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'

const DraggableItem = ({
  item,
  index,
  onDrop,
  moveItem,
  isSelected,
  onSelect,
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
        moveItem(draggedItem.index, index)
        draggedItem.index = index
      }
    },
    canDrop: () => true,
  })

  const handleClick = () => {
    onSelect(index)
  }

  return (
    <li
      ref={(node) => {
        drag(node)
        drop(node)
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        background: isSelected ? 'lightblue' : 'transparent',
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
}

export default DraggableItem
