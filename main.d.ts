import * as React from 'react';

declare module '@dnd-kit/core' {
  export interface DragStartEvent {
    active: {
      id: string;
      data: {
        current: {
          item: Item;
        }
      }
    }
  }

  export interface DragMoveEvent {
    active: {
      id: string;
    },
    over: {
      id: string;
    }
  }

  export interface DragEndEvent {
    active: {
      id: string;
    },
    over: {
      id: string;
    }
  }
}

export type Item = {
  id: number | string;
  position: number;
  content: string;
  type: "image" | "text" | "website";
};


export interface BoardProps {
  items: {
    id: number | string;
    position: number;
    content: string;
    type: "image" | "text" | "website";
  }[];
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
}

declare const Board: React.FC<BoardProps>
export { Board };

