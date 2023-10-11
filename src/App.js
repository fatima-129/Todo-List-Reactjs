import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import './style.css';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      text,
      checked: false,
    };
    setItems((pre) => [newItem, ...pre]);
    setText('');
  };

  const handleDeleteItem = (text) =>
    setItems(items.filter((i) => i.text !== text));

  const handleCheckItem = (checked, text) => {
    const itemIndex = items.findIndex((i) => i.text === text);
    const copyItems = [...items];
    copyItems[itemIndex].checked = checked;
    setItems(copyItems);
  };

  return (
    <div className="container flex">
      <div className="todo_container flex">
        <form onSubmit={handleAddItem} className="input_container flex">
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Add Item</button>
        </form>
        <div className="todo_list flex">
          {items.map((item, idx) => (
            <TodoItem
              key={idx}
              item={item}
              handleCheckItem={handleCheckItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TodoItem = ({ item, handleCheckItem, handleDeleteItem }) => {
  return (
    <div className={`item_container flex ${item.checked ? 'selected' : ''}`}>
      <div className="text_container flex">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={(e) => handleCheckItem(e.target.checked, item.text)}
        />
        <p>{item.text}</p>
      </div>
      <div
        onClick={() => handleDeleteItem(item.text)}
        className="icon_box flex"
      >
        <Trash color="white" size={18} />
      </div>
    </div>
  );
};
