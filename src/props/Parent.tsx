import { Child } from "./Child";

const Parent = () => {
    return (
        <Child color='green' onClick={() => console.log("clicked!")}>
            fgdsgds
        </Child>
    );
};

export default Parent;
