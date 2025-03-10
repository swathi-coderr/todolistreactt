import React, { useState } from "react";
import Shop from "./Shop";
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa"; // Corrected import for FaSave

import { IoMdAddCircle } from "react-icons/io"; // Correct import for IoMdAddCircle

const Content = ({ user }) => {
  let [items, setItems] = useState([
    { id: 1, label: "Html & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React Js", checked: false },
  ]);

  let [newItem, setNewItem] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [currentEleID, setCurrentEleID] = useState(null);

  let handleChecked = (id) => {
    let newListItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });

    setItems(newListItems);
  };

  let handleAddorSaveItem = () => {
    if (isEditing) {
      let newListItems = items.map((item) => {
        return item.id === currentEleID ? { ...item, label: newItem } : item;
      });
      setItems(newListItems);
      setCurrentEleID(null);
      setNewItem("");
      setIsEditing(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setNewItem("");
    }
  };

  let handleUpdate = (id) => {
    let listItem = items.find((item) => item.id === id);
    setNewItem(listItem.label);
    setIsEditing(true);
    setCurrentEleID(id);
  };

  let handleDelete = (id) => {
    let newItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });

    setItems(newItems);
  };

  return (
    <main>
      {/* <Shop user={user} /> */}
      <div className="addItem">
        <input
          type="text"
          value={newItem}
          placeholder="Add New Item"
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button onClick={handleAddorSaveItem}>
          {isEditing ? (
            <FaSave color="green" /> // Replaced CiSaveDown2 with FaSave
          ) : (
            <IoMdAddCircle color="blue" />
          )}
        </button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
              />
              <label> {item.label} </label>
              <FaEdit
                id="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
              />
              <FaTrashAlt
                id="delete"
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Content;
