import ReactDOM from "react-dom";
import SelectionSort from "./sorting/SelectionSort";
import "./index.css";

const App = () => {
    return (
        <div>
            <SelectionSort />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
