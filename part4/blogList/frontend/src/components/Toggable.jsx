import { useState, useImperativeHandle } from "react";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })
  return (
    <>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Toggable