import {useEffect} from "react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {useState} from "react";

// import {BoardItem} from "./BoardItem";
import {ImageItem} from "./ImageItem";
// import {Child} from "./Child";

function Board(props: PropTypes) {
  const {items} = props;

  const [boardItems, setBoardItems] = useState<any>([]);

  useEffect(() => {
    setBoardItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function updateDB(items: any) {
    localStorage.setItem("board-data", items.toString());
  }

  const options = {
    editItem,
    deleteItem,
  };

  return (
    <div>
      <div>
        {boardItems.map((item: any, i) => (
          <div key={i}>
            ID: {item.id} | POSITION: {item.position} | TYPE: {item.type} |
            CONTENT: {item.content}
          </div>
        ))}
      </div>
      {/* <div>Original Photo: </div> */}
      <div>
        {/* <img src="https://picsum.photos/id/421/550/650" alt="img" /> */}
      </div>
      <div className="board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={boardItems}
            strategy={horizontalListSortingStrategy}
          >
            {boardItems.map((item: any) => {
              return (
                <ImageItem
                  key={item.id}
                  id={item.id}
                  position={item.position}
                  content={item.content}
                  options={options}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  async function handleDragEnd(event: any) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setBoardItems((items: any) => {
        // Update Indices & Update Array
        const oldIndex = active.id;
        const newIndex = over.id;

        const updatedItems = arrayMove(items, oldIndex, newIndex).map(
          (item: any, index) => ({...item, position: index})
        );

        // Update the DB (callback)
        updateDB(updatedItems);
        return updatedItems;
      });
    }
  }

  function deleteItem(position: number) {
    const newItems = boardItems
      .slice(0, position)
      .concat(boardItems.slice(position + 1))
      .map((item, index) => ({...item, position: index}));

    setBoardItems(newItems);
  }

  function editItem(position: number, newContent: string) {
    const newItems = boardItems.map((item, index) =>
      index === position ? {...item, content: newContent} : item
    );
    setBoardItems(newItems);
  }
}

type PropTypes = {
  items: {
    id: number | string;
    position: number;
    content: string;
    type: "image" | "text" | "website";
  }[];
};

export default Board;
