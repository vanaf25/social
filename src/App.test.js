import MainApp from "./Construction";
import ReactDOM from "react-dom";

test('renders learn react link', () => {
  const div=document.createElement('div');
  ReactDOM.render(
      <MainApp/>,div)
  ReactDOM.unmountComponentAtNode(div);
});
