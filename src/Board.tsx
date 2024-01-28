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
import {TextItem} from "./TextItem";
import {Child} from "./Child";

function Board(props: PropTypes) {
  const {items, styles} = props;
  const gridGap = styles.gridGap;

  const boardStyles = {
    gridGap: gridGap,
  };

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
      <div className="board" style={boardStyles}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
        >
          <SortableContext items={boardItems}>
            {boardItems.map((item: any) => {
              if (item.type === "image") {
                return (
                  <ImageItem key={item.id} item={item} options={options}>
                    {" "}
                    <Child text={item.content} />
                  </ImageItem>
                );
              } else if (item.type === "text") {
                return (
                  <TextItem key={item.id} item={item} options={options}>
                    <Child text={item.content} />
                  </TextItem>
                );
              }
            })}
          </SortableContext>
          <DragOverlay>{activeItem && <DragItem />}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function DragItem() {
    if (activeItem.type === "image") {
      return <ImageItem item={activeItem} />;
    } else if (activeItem.type === "text") {
      return <TextItem item={activeItem} />;
    }
  }

  function handleDragStart(event: any) {
    const {active} = event;
    setActiveItem(active.data.current.item);
  }

  function searchItemById(id: UniqueIdentifier | undefined) {
    return items.find((item) => item.id === id);
  }

  function handleDragMove(event: any) {
    const {active, over} = event;

    // handle sorting
    if (active && over && active.id !== over.id) {
      // find active items
      const activeItem = searchItemById(active.id);
      const overItem = searchItemById(over.id);
      // if either not found? return
      if (!activeItem || !overItem) return;

      // find indicies
      const activeIndex = boardItems.findIndex((item) => item.id === active.id);
      const overIndex = boardItems.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(boardItems, activeIndex, overIndex);

      updatedItems.forEach((item, index) => {
        item.position = index + 1;
      });
      setBoardItems(updatedItems);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    // DOES NOT hit most of the time due to handleDragMove() handler.
    if (over && active.id !== over.id) {
      // find index
      const activeIndex = boardItems.findIndex((item) => item.id === active.id);
      const overIndex = boardItems.findIndex((item) => item.id === over.id);

      const activeItem = searchItemById(active.id);
      const overItem = searchItemById(over.id);

      activeItem!.position = overIndex + 1;
      overItem!.position = overIndex + 1;

      // swap active and over container
      let newItems = [...boardItems];
      newItems = arrayMove(newItems, activeIndex, overIndex);
      setBoardItems(newItems);
    }
    setActiveItem(null);
  }

  function deleteItem(position: number) {
    // const newItems = boardItems
    //   .slice(0, position)
    //   .concat(boardItems.slice(position + 1))
    //   .map((item, index) => ({...item, position: index + 1}));

    // setBoardItems(newItems);
    const newItems = boardItems
      .filter((item) => item.position !== position)
      .map((item, index) => ({...item, position: index + 1}));

    setBoardItems(newItems);
  }

  function editItem(id: number | string, editedContent: string) {
    const newItems = boardItems.map((item) =>
      item.id === id ? {...item, content: editedContent} : item
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
  styles: {
    gridGap: string | number;
  };
};

export default Board;
