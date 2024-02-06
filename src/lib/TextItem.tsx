import {useState, useEffect, useRef} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
// import pfpIcon from "../assets/pfp.svg";
import DragGrab from "../assets/drag.svg";
import OptionsIcon from "../assets/more-options.svg";
import EditIcon from "../assets/pencil.svg";
import TrashIcon from "../assets/trash.svg";

export function TextItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // image item => call it image
  const {options, item, children, minimal} = props;

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

  // Show Options
  const [showOptions, setShowOptions] = useState(false);
  const [showDrag, setShowDrag] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOffOptions(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        // setShowOptions(false);
        return;
      }
    }

    document.addEventListener("mousedown", handleClickOffOptions);

    return () => {
      document.removeEventListener("mousedown", handleClickOffOptions);
    };
  });

  // Editing Logic
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(item.content);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    options?.editItem(item.id, editedText);
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
      className="wz-image-item"
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
      {!minimal && (
        <div
          className="wz-item-toolbar"
          ref={optionsRef}
          onMouseEnter={() => setShowDrag(true)}
          onMouseLeave={() => setShowDrag(false)}
        >
          <img className="wz-pfp-icon" src={item.icon} alt="pfp" />
          {showDrag ? (
            <img
              className="wz-drag-icon"
              src={DragGrab}
              alt="drag"
              {...attributes}
              {...listeners}
            />
          ) : (
            <div>{item.title}</div>
          )}
          <img
            className="wz-options-icon"
            src={OptionsIcon}
            alt="options"
            onClick={() => {
              setShowOptions((s) => !s);
            }}
          />
        </div>
      )}
      {showOptions && <Options />}
      <div className="wz-item-content">
        {editing && (
          <div className="wz-text-item-input-container">
            <textarea
              className="wz-text-item-input"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
              rows={14}
              spellCheck="false"
            ></textarea>
            <button className="wz-button wz-save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="wz-button wz-close-button"
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
        )}

        {!editing && (
          <div className="wz-text-item-content-container">
            <div className="wz-text-item-content">{item.content}</div>
          </div>
        )}
      </div>
      {children ? children(item.id) : null}
    </div>
  );

  function Options() {
    return (
      <div className="wz-options">
        <div
          className="wz-options-row"
          onClick={() => {
            handleEditClick();
            setShowOptions((s) => !s);
          }}
        >
          Edit <img src={EditIcon} alt="edit-icon" />
        </div>
        <div
          className="wz-options-row"
          onClick={() => {
            options?.deleteItem(item.id);
            setShowOptions((s) => !s);
          }}
        >
          Delete <img src={TrashIcon} alt="delete-icon" />
        </div>
      </div>
    );
  }
}

type OptionType = {
  deleteItem: (id: number | string) => void;
  editItem: (id: number | string, newContent: string) => void;
};

type PropTypes = {
  id?: string | number;
  item: Item;
  options?: OptionType;
  children?: (id: string | number) => JSX.Element;
  minimal?: boolean;
};

import type {Item} from "./Types";
