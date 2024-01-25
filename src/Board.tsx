import {useEffect} from "react";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {useState} from "react";

// import {BoardItem} from "./BoardItem";
import {ImageItem} from "./ImageItem";
import {createPortal} from "react-dom";
// import {Child} from "./Child";

function Board(props: PropTypes) {
  const {items} = props;

  const [boardItems, setBoardItems] = useState<any>([]);

  useEffect(() => {
    setBoardItems(items);
  }, [items]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Drag Overlay
  const [activeItem, setActiveItem] = useState<any>(null);

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
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
        >
          <SortableContext items={boardItems}>
            {boardItems.map((item: any) => {
              return <ImageItem key={item.id} item={item} options={options} />;
            })}
          </SortableContext>
          <DragOverlay>
            {activeItem && <ImageItem item={activeItem} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event: any) {
    const {active} = event;
    console.log(event);
    setActiveItem(active.data.current.item);
  }

  function findValueOfItems(id: UniqueIdentifier | undefined) {
    return items.find((item) => item.id === id);
  }

  function handleDragMove(event: any) {
    const {active, over} = event;

    // handle sorting
    if (active && over && active.id !== over.id) {
      // find active items
      const activeItem = findValueOfItems(active.id);
      const overItem = findValueOfItems(over.id);
      // if either not found? return
      if (!activeItem || !overItem) return;

      // find indicies
      const activeIndex = boardItems.findIndex((item) => item.id === active.id);
      const overIndex = boardItems.findIndex((item) => item.id === over.id);

      setBoardItems((boardItems: any) => {
        return arrayMove(boardItems, activeIndex, overIndex);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      // find index
      const activeIndex = boardItems.findIndex((item) => item.id === active.id);
      const overIndex = boardItems.findIndex((item) => item.id === over.id);

      // swap active and over container
      let newItems = [...boardItems];
      newItems = arrayMove(newItems, activeIndex, overIndex);
      setBoardItems(newItems);
    }
    setActiveItem(null);
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
