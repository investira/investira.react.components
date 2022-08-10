import "./App.css";
import { Divisor, SubmitButton, SlideView, Alerts } from "./components";

function App() {
  return (
    <div className="App">
      Test Area
      <div className="testArea">
        <Alerts iconName={"ok"} />
        {/* <SlideView id="teste">
          <img alt={""} src={"https://picsum.photos/200"} />
          <img alt={""} src={"https://picsum.photos/200"} />
          <img alt={""} src={"https://picsum.photos/200"} />
          <img alt={""} src={"https://picsum.photos/200"} />
          <img alt={""} src={"https://picsum.photos/200"} />
        </SlideView> */}
      </div>
    </div>
  );
}

export default App;
