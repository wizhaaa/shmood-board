import {ReactNode, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragIcon from "./assets/drag-icon.svg";
import OptionsIcon from "./assets/more-options.svg";

export function ImageItem(props: Readonly<PropTypes>) {
  // options are the functions when click the [...] more options panel
  // image item => call it image
  const {options, item: image} = props;

  // DND-sortable
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: image.position,
      data: {
        type: "image",
        image,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // My Logic.
  // will be passed as a prop (prop.itemWidth)
  // const itemWidth = 250;
  // Image sizing
  const [dims, setDims] = useState<any>({
    height: 0,
    width: 0,
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
  const [editedImageUrl, setEditedImageUrl] = useState<string>(image.content);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    options.editItem(image.position, editedImageUrl);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedImageUrl(image.content);
  };

  if (isDragging) { 
    return <div className="drag-placeholder"></div>
  }

  return (
    <div className="image-item" ref={setNodeRef} style={style}>
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
      {editing && <NewImageInput />}

      <img
        style={dims.height >= dims.weight ? imgStyleTall : imgStyleWide}
        src="https://picsum.photos/id/421/450/950"
        alt="img"
        onLoad={onImageLoad}
      />
    </div>
  );

  function Options() {
    return (
      <div className="options">
        <div
          className="delete-icon"
          onClick={() => {
            options.deleteItem(position);
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

  function NewImageInput() {
    return (
      <div className="image-url-input">
        <input
          type="text"
          value={editedImageUrl}
          onChange={(e) => setEditedImageUrl(e.target.value)}
        />
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="close-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

type OptionType = {
  deleteItem: (arg0: number) => void;
  editItem: (arg0: number, arg1: string) => void;
};

type PropTypes = {
  key: null | number | string;
  id: any;
  item: {
    position: number;
    content: string;
  };
  options: OptionType;
  // children?: ReactNode;
};
