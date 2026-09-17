import TooltipComponent from "./TooltipComponent";

export const SliceText = ({text, length, placement = "topLeft"}) => {
  return text?.length >= length ? (
    <TooltipComponent
      title={text}
      placement={placement}
      
    >{`${text.toString().slice(0, length)}....`}</TooltipComponent>
  ) : (
    text
  );
};