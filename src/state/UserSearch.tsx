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

    return (
        <div>
            <h3>User Search</h3>
            {user && (
                <div>
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                </div>
            )}
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={onClick}>Search</button>
        </div>
    );
};

export default UserSearch;
