import {CSSProperties, ReactNode, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragIcon from "../assets/drag-icon.svg";
import OptionsIcon from "../assets/more-options.svg";

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

  // function onImageLoad(event: SyntheticEvent<HTMLImageElement>) {
  //   const img = event.target as HTMLImageElement;
  //   setDims({
  //     height: img.naturalHeight,
  //     width: img.naturalWidth,
  //   });
  // }

  // const imgStyleTall: CSSProperties = {
  //   height: `400px`,
  // };

  const imgStyleWide: CSSProperties = {
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
      {!minimal && (
        <>
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
        </>
      )}

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

      {validImage! && <img style={imgStyleWide} src={item.content} alt="img" />}

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
  editItem: (arg0: number | string, arg1: string) => void;
};

type PropTypes = {
  id?: string | number;
  item: {
    id: number | string;
    position: number;
    content: string;
  };
  options?: OptionType;
  children?: ReactNode;
  minimal?: boolean;
};

// type Item = {
//   id: number | string;
//   position: number;
//   content: string;
// };

// type Dimensions = {
//   height: number;
//   width: number;
// };
