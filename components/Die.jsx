export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld? "#59E391" : "white"
  }
  return (
    <button
      className="dice--face"
      style={styles}
      onClick={props.handleClick}
    >
      <h2 className="dice--num">{props.value}</h2>
    </button>
  )
}
