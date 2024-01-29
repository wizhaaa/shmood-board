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

type Item = {
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
  onReorder?: (arg1: Item[]) => void;
  className?: string;
  footerContent: React.ReactNode | React.ReactElement | JSX.Element;
}

declare const Board: React.FC<BoardProps>
export default Board;