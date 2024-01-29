# Shmood DND Board Package

Shmood DND Board is a simple gallery view for drag and droppable, sortable, and movable grid items. Allows you to edit text and displays images.

## Want to use in your application?

### Yarn

```bash
 yarn add shmood-dnd-board
```

### NPM

```bash
 npm install shmood-dnd-board
```

## Code

### Imports:

```javascript
// @ts-ignore
import {Board} from "shmood-dnd-board";
import "shmood-dnd-board/shmood-board.css";
```

### Init Sample Data

```javascript
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LOADED_DATA = [
  {
    id: "1asdfsdaf",
    position: 1,
    type: "image",
    content: "https://picsum.photos/id/421/450/950",
  },
  {
    id: "2zzz",
    position: 2,
    type: "image",
    content: "https://picsum.photos/id/419/950/350",
  },
  {
    id: 3,
    position: 3,
    type: "text",
    content: lorem,
  },
  {
    id: "4s8923rpqw",
    position: 4,
    type: "image",
    content: "https://picsum.photos/id/424/950/450",
  },
  {
    id: 5,
    position: 5,
    type: "image",
    content: "https://picsum.photos/id/425/950/450",
  },
  {
    id: "6ekkew",
    position: 6,
    type: "text",
    content: lorem,
  },
  {
    id: "7ok",
    position: 7,
    type: "image",
    content: "https://picsum.photos/id/427/150/1050",
  },
  {
    id: "lesserafim",
    position: 8,
    type: "image",
    content: "https://picsum.photos/id/212/450/450",
  },
  {
    id: "ive",
    position: 9,
    type: "image",
    content: "https://picsum.photos/id/909/100/100",
  },
  {
    id: "twice",
    position: 10,
    type: "image",
    content: "https://picsum.photos/id/80/300/300",
  },
];
```

### Pass into the component:

```javascript
function App() {
  type Item = {
    id: number | string,
    position: number,
    content: string,
    type: "image" | "text" | "website",
  };
  function onReorder(newItems: Item[]) {
    console.log("Items Re-ordered: ", newItems);
  }

  const className = "wz-className";
  return (
    <>
      Your App Name
      <div>
        <Board
          items={LOADED_DATA}
          styles={{
            gridGap: 50,
          }}
          minimal={false}
          onReorder={onReorder}
          className={className}
        />
      </div>
    </>
  );
}
```

## Contributing:

Run with

```bash
yarn dev
```

# Jan 24 Update - _Images & Text_

## Editing + Moving

https://github.com/wizhaaa/shmood-board/assets/46132945/1098072f-f0ac-48f0-aa52-c63b717dc835

## Deleting

https://github.com/wizhaaa/shmood-board/assets/46132945/bb3c946d-bf22-4f0d-bfe4-4b208f9049db

# Jan 23 Update

https://github.com/wizhaaa/shmood-board/assets/46132945/5754286a-6698-4727-89b3-2ce3e81e45b7
