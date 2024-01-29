import {useEffect} from "react";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCorners,
  DragMoveEvent,
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {useState} from "react";

import {ImageItem} from "./ImageItem";
import {TextItem} from "./TextItem";

import "./board.css";

function Board(props: PropTypes) {
  // PROCESSING PROPS & ITEMS DATA
  const {items, styles, minimal} = props;
  const gridGap = styles.gridGap;

  const boardStyles = {
    gridGap: gridGap,
  };

  const [boardItems, setBoardItems] = useState<Item[]>([]);

  useEffect(() => {
    setBoardItems(items);
  }, [items]);

  // DND KIT SENSORS SET UP
  const sensors = useSensors(useSensor(PointerSensor));

  // Drag Overlay
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  // BASIC EDIT AND DELETE TIEMS "OPTIONS" (FUNCTIONS)

  const options = {
    editItem,
    deleteItem,
  };

  return (
    <div className="wz-root">
      <div className="wz-board" style={boardStyles}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
        >
          <SortableContext items={boardItems}>
            {boardItems.map((item: Item) => {
              if (item.type === "image") {
                return (
                  <ImageItem
                    key={item.id}
                    item={item}
                    options={options}
                    minimal={minimal}
                  ></ImageItem>
                );
              } else if (item.type === "text") {
                return (
                  <TextItem
                    key={item.id}
                    item={item}
                    options={options}
                    minimal={minimal}
                  ></TextItem>
                );
              }
            })}
          </SortableContext>
          <DragOverlay>{activeItem && <DragItem />}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  /** Renders the correct item tyep when a user drags based on the active item. */
  function DragItem() {
    if (activeItem?.type === "image") {
      return <ImageItem item={activeItem} />;
    } else if (activeItem?.type === "text") {
      return <TextItem item={activeItem} />;
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const {active} = event;
    setActiveItem(active?.data?.current?.item);
  }

  /** Helper function to hanlde dragging */
  function searchItemById(id: string | number) {
    return items.find((item) => item.id === id);
  }

  function handleDragMove(event: DragMoveEvent) {
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

  /** Deletes item given their position (should be changed to ID). */
  function deleteItem(position: number) {
    // const newItems = boardItems
    //   .slice(0, position)
    //   .concat(boardItems.slice(position + 1))
    //   .map((item, index) => ({...item, position: index + 1}));

    // setBoardItems(newItems);
    const newItems = boardItems
      .filter((item: Item) => item.position !== position)
      .map((item: Item, index: number) => ({...item, position: index + 1}));

    setBoardItems(newItems);
  }

  /**  Edits the item given thier 
        @param id  to new @param editedContent*/
  function editItem(id: number | string, editedContent: string) {
    const newItems = boardItems.map((item: Item) =>
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
  minimal: boolean;
};

type Item = {
  id: number | string;
  position: number;
  content: string;
  type: "image" | "text" | "website";
};

export default Board;
