import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import './target.component.css'

const TargetArea = ({ droppedItems, onDrop }) => {
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

  return (
    <div ref={drop} className="container" style={{ backgroundColor }}>
      <h2>Target Area</h2>
      {isOver && canDrop && <p>Drop here</p>}
      {isOver && !canDrop && <p>Cannot drop here</p>}
      <ul>
        {droppedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
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
