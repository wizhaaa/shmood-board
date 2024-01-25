import {ReactNode, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragIcon from "./assets/drag-icon.svg";
import OptionsIcon from "./assets/more-options.svg";

export function TextItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // image item => call it image
  const {options, item, children} = props;

  // DND-sortable
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: item.id,
      data: {
        type: "text",
        item: item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // const itemWidth = 250;

  // Show Options
  const [showOptions, setShowOptions] = useState(false);

  // Editing Logic
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(item.content);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    options?.editItem(item.id, editedText);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedText(item.content);
  };

  const draggingStyle = {
    opacity: "0.1",
  };

  return (
    <div
      className="image-item"
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
      {!editing && (
        <>
          {" "}
          <img
            className="drag-icon"
            src={DragIcon}
            alt="drag"
            {...attributes}
            {...listeners}
          />
          <img
            className="options-icon"
            src={OptionsIcon}
            alt="options"
            onClick={() => {
              console.log("edit text");
              setShowOptions((s) => !s);
            }}
          />
        </>
      )}
      {showOptions && <Options />}
      {editing && (
        <div className="text-item-input-container">
          <textarea
            className="text-item-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
            rows={14}
            spellCheck="false"
          ></textarea>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="close-button" onClick={handleCancel}>
            Close
          </button>
        </div>
      )}
      {children}

      {!editing && (
        <div className="text-item-content-container">
          <div className="text-item-content">{item.content}</div>
        </div>
      )}
    </div>
  );

  function Options() {
    return (
      <div className="options">
        <div
          className="delete-icon"
          onClick={() => {
            options?.deleteItem(item.position);
            setShowOptions((s) => !s);
          }}
        >
          Delete
        </div>
        <div
          className="edit-icon"
          onClick={() => {
            handleEditClick();
            setShowOptions((s) => !s);
          }}
        >
          Edit
        </div>
      </div>
    );
  }
}

type OptionType = {
  deleteItem: (arg0: number) => void;
  editItem: (arg0: number, arg1: string) => void;
};

type PropTypes = {
  // key: null | number | string;
  id?: any;
  item: {
    id: number | string;
    position: number;
    content: string;
  };
  options?: OptionType;
  children?: ReactNode;
};
