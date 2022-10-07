import React from 'react'
import "./TableData.css";
function TableData(props) {
  return (
    <div>
          <tr className="TableData">
             <td><div className='TableDiv'><a style={{color: props.value.answer !== null ? "Green" : props.value.comments.totalCount !== 0 ? "orange":"red",}} href={props.value.DiscussionUrl}>{props.value.title}</a></div></td>
             <td><div className='TableDiv'>{props.value.createdAt.toLocaleString().split("T")[0]}</div></td>
             <td><div className='TableDiv'>{props.value.updatedAt.toLocaleString().split("T")[0]}</div></td>
             <td><div className='TableDiv'>{props.value.comments.totalCount}</div></td>
            </tr>
    </div>
  )
}

export default TableData
