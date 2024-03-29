import {useEffect, useRef, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

// import pfpIcon from "../assets/pfp.svg";
import DragGrab from "../assets/drag.svg";
import OptionsIcon from "../assets/more-options.svg";
import EditIcon from "../assets/pencil.svg";
import TrashIcon from "../assets/trash.svg";

/**  Renders an Image Item on a board.
 * @param options - default to edit, delete
 * @param item - the item object itself
 * @param children - any children to render as a "footer"
 */
export function ImageItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // image item => call it image
  const {options, item, children, minimal} = props;

  // DND-sortable setup
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: item.id,
      data: {
        type: "image",
        item: item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [validImage, setValidImage] = useState<boolean | unknown>(true);

  async function isImageUrl(url: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function checkImageValidity() {
    const isValid = await isImageUrl(item.content);
    setValidImage(isValid);
  }

  useEffect(() => {
    checkImageValidity();
  });

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
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOffOptions);

    return () => {
      document.removeEventListener("mousedown", handleClickOffOptions);
    };
  });

  // Editing Logic
  const [editing, setEditing] = useState(false);
  const [editedImageUrl, setEditedImageUrl] = useState<string>(item.content);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    options?.editItem(item.id, editedImageUrl);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedImageUrl(item.content);
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
          <div className="wz-image-url-input">
            <input
              type="text"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              autoFocus
            ></input>
            <button className="wz-button wz-save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="wz-button wz-close-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}

        {validImage! && (
          <img className="wz-image" src={item.content} alt="img" />
        )}

        <div className="wz-invalid-img-text">{!validImage && "X"}</div>
      </div>
      {children ? children(item.id) : null}
    </div>
  );

  function Options() {
    return (
      <div className="wz-options" ref={optionsRef}>
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

// type Item = {
//   id: number | string;
//   position: number;
//   content: string;
// };
