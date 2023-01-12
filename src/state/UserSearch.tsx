import { useState } from "react";

const users = [
    { name: "Sarah", age: 18 },
    { name: "Alex", age: 55 },
    { name: "Michael", age: 21 },
];

const UserSearch: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [user, setUser] = useState<
        { name: string; age: number } | undefined
    >();

    const onClick = () => {
        setUser(users.find((user) => user.name === search));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        console.log("Dragging...", event);
    };

    return (
        <div>
            <h3>User Search</h3>
            {user && (
                <div>
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                </div>
            )}
            <input value={search} onChange={onChange} />
            <button onClick={onClick}>Search</button>
            <div draggable onDragStart={onDragStart}>
                Drag Me
            </div>
        </div>
    );
};

export default UserSearch;
