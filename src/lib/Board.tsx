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
import {WebItem} from "./WebItem";

import type {Item} from "./Types";

import "./board.css";

/** Board component.
 * @props items : Item[]
 * @props itemWidth : number
 * @props styles : {gridGap : number}
 * @props minimal? : boolean
 * @props onReorder? : (updatedItems : Item[] ) => void;
 * @props className? : string
 * @props footerContent : JSX.Element | React.ReactNode | React.ReactElement
 */
export default function Board(props: BoardProps) {
  // PROCESSING PROPS & ITEMS DATA
  const {
    items,
    // itemWidth,
    styles,
    minimal,
    onReorder,
    onEdit,
    onDelete,
    className,
    footerContent,
  } = props;
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
    <div className={`wz-root ${className}`}>
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
                  >
                    {footerContent}
                  </ImageItem>
                );
              } else if (item.type === "text") {
                return (
                  <TextItem
                    key={item.id}
                    item={item}
                    options={options}
                    minimal={minimal}
                  >
                    {footerContent}
                  </TextItem>
                );
              } else if (item.type === "website") {
                return (
                  <WebItem
                    key={item.id}
                    item={item}
                    options={options}
                    minimal={minimal}
                  >
                    {footerContent}
                  </WebItem>
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
    } else if (activeItem?.type === "website") {
      return <WebItem item={activeItem} />;
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

      // User logic to handle re-ordering of board items: (*main -> dragEnd in case fails to capture re-order*)
      onReorder!(updatedItems);
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

      // User logic to handle re-ordering of board items (*only hit if drag move does not capture reorder*)
      onReorder!(newItems);
    }
    setActiveItem(null);
  }

  /** Deletes item given their position (should be changed to ID). */
  function deleteItem(id: number | string) {
    const newItems = boardItems
      .filter((item: Item) => item.id !== id)
      .map((item: Item, index: number) => ({...item, position: index + 1}));

    onDelete!(id);
    setBoardItems(newItems);
  }

  /**  Edits the item given thier 
        @param id  to new @param editedContent*/
  function editItem(id: number | string, editedContent: string) {
    const newItems = boardItems.map((item: Item) => {
      if (item.id === id) {
        const modifiedPost: Item = {...item, content: editedContent};
        onEdit!(modifiedPost);
        return {...item, content: editedContent};
      }
      return item;
    });
    setBoardItems(newItems);
  }
}

type BoardProps = {
  items: Item[];
  itemWidth: number;
  styles: {
    gridGap: string | number;
  };
  minimal?: boolean;
  onReorder?: (reorderedItems: Item[]) => void;
  onDelete?: (id: string | number) => void;
  onEdit?: (modifiedPost: Item) => void;
  className?: string;
  footerContent: (id: string | number) => JSX.Element;
};
