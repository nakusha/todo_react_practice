import ReactDom from "react-dom";

const Portal = ({ child }: { child: JSX.Element }) => {
  const el = document.getElementById("modal");

  return ReactDom.createPortal(child, el!);
};

export default Portal;
