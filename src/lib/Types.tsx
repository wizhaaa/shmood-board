export type Item = {
  id: number | string;
  position: number;
  content: string;
  title: string;
  icon: string;
  type: "image" | "text" | "website";
};
