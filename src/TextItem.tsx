import {useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragIcon from "./assets/drag-icon.svg";
import OptionsIcon from "./assets/more-options.svg";

export function TextItem(props: Readonly<PropTypes>) {
  const {position, options} = props;

  // DND-sortable
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: position});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // My Logic.
  // will be passed as a prop (prop.itemWidth)
  // const itemWidth = 250;
  // Image sizing

  // Show Options
  const [showOptions, setShowOptions] = useState(false);

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
      Text -TODO INPUT
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
            options.editItem(position, "new");
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
  key: null | number | string;
  id: any;
  position: number;
  content: string | number;
  options: OptionType;
};
