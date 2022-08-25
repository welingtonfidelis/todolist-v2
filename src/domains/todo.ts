export enum TodoStatusEnum {
  DONE = "done",
  DOING = "doing", 
  TODO = "todo",
}

export interface TodoInterface {
  id?: number;
  color: string;
  description: string;
  date?: string;
  time?: string;
  status: "done" | "doing" | "todo";
}