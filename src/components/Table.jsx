import React from 'react'

const Table = (props) => {
  return (
      <div>Table
          {props.data.map((form, index) => (<tbody><tr><th>{console.log(form)}</th></tr></tbody>))}
    </div>
  )
}

export default Table