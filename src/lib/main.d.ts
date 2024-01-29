// main.d.ts 

declare module "shmood-dnd-board" {
  export type Board = {
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

  export const Board: React.ComponentType<BoardProps>;

  type BoardProps = {
    items: Board['items'];
    styles: Board['styles'];
    minimal: boolean;
  }
}
