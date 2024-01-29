import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export function BoardItem(props: Readonly<PropTypes>) {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="item" ref={setNodeRef} style={style}>
      <div className="drag-icon" {...attributes} {...listeners}>
        .
      </div>
      Item: {props.content}
    </div>
  );
}

type PropTypes = {
  key: null | number | string;
  id: string | number;
  content: string | number;
};
