import React, { PropTypes } from 'react'
import cx from 'classnames'


const CustomTypeaheadList = ({ options, selectionIndex }) => (
  <div className='ui link list'>
    {options.map((option, index) => (
      <a className={cx({ active: index === selectionIndex }, 'item')}>
        {option}
      </a>
    ))}
  </div>
)

CustomTypeaheadList.propTypes = {
  options: PropTypes.array.isRequired,
  selectionIndex: PropTypes.number,
}

export default CustomTypeaheadList