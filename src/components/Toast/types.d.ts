export interface Toast {
  id: string;
  title: string;
  icon?: JSX.Element;
  type: "success" | "danger" | "warning";
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "left-center"
    | "bottom-center"
    | "right-center";
}
