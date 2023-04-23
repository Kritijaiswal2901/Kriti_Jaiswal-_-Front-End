# Steeleye Assignment
 
## 1.Explain what the simple `List` component does.

The `List` component is a memo version of `WrappedListComponent`(user defined React component). It takes an array of items as a prop and renders an unordered list using `SingleListItem` as list item for each element in the items.

## 2.What problems / warnings are there with code?
Following are the problems and warnings I have faced with this 
- **Error:**
 Uncaught TypeError: PropTypes.shapeOf is not a function (List.js:51)
- **Solution:**
 `PropTypes.shapeof ` changes to   `PropTypes.shape `  as React allows us to define the shape of an object we expect to receive by using `PropTypes.shape()`.
---
 
- **Error:**
 Uncaught TypeError: setSelectedIndex is not a function (List.js:29)
```const [setSelectedIndex, selectedIndex] = useState();``` (Incorrect)
- **Solution:**
This is incorrect because the order of the elements in the array returned by useState is important. The first element in the array is always the current state value, and the second element is always the function to update the state value.
```const [setSelectedIndex, selectedIndex] = useState();``` (Correct)
---
- **Error:**
Warning: Failed prop type: Invalid prop `isSelected` of type `number` supplied to `WrappedSingleListItem`, expected `boolean`.
- **Solution:**
```isSelected: PropTypes.bool``` is defined in PropType and we are passing Integer.
~~`isSelected={selectedIndex}`~~ => `isSelected={selectedIndex === index}`
---
- **Error:**
Warning: Each child in a list should have a unique "key" prop.
- **Solution:**
`key={index}` is passed as a prop in single list item.
---
- **Error:**
`onClickHandler` in `SingleListItem` is not excepting any parameters but the code has passed the index as parameter
- **Solution:**
~~`onClick={onClickHandler(index)}`~~=> `onClick={onClickHandler}`
---
- **Problem:**
Default value of the items props in `wrappedListComponet` is  passed as a `null` .
- **Solution:**
Default value should be passed as an empty array(`[]`) to avoid the runtime error when no value is passed as items .
---
## 3.Please fix, optimize, and/or modify the component as much as you think is necessary.
```Note: After updating the code, index is not required so we have removed it from WrappedSingleListItem component and also from the prototype.```
### Modified code after optimization
```javascript
import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={onClickHandler}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: [],
};

const List = memo(WrappedListComponent);

export default List;
```



  

 


