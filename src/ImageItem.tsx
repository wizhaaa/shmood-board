import {ReactNode, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragIcon from "./assets/drag-icon.svg";
import OptionsIcon from "./assets/more-options.svg";

export function ImageItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // image item => call it image
  const {options, item, children} = props;

  // DND-sortable
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

  // Image Rendering Logic
  // will be passed as a prop (prop.itemWidth)
  // const itemWidth = 250;
  // Image sizing
  const [dims, setDims] = useState<any>({
    height: 0,
    width: 0,
  });
  const [validImage, setValidImage] = useState(true);

  async function isImageUrl(url) {
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

  function onImageLoad({target: img}: any) {
    setDims({
      height: img.naturalHeight,
      width: img.naturalWidth,
    });
  }

  const imgStyleTall: any = {
    height: `400px`,
    objectFit: "fit",
  };

  const imgStyleWide: any = {
    width: "400px",
    height: "auto",
    objectFit: "scale-down",
  };

  // Show Options
  const [showOptions, setShowOptions] = useState(false);

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
      className="image-item"
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
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
        onClick={() => setShowOptions((s) => !s)}
      />
      {showOptions && <Options />}
      {editing && (
        <div className="image-url-input">
          <input
            type="text"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            autoFocus
          ></input>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="close-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
      {children}

      {validImage && (
        <img
          style={dims.height >= dims.weight ? imgStyleTall : imgStyleWide}
          src={item.content}
          alt="img"
          onLoad={onImageLoad}
        />
      )}

      <div className="invalid-img-text">{!validImage && "X"}</div>
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
