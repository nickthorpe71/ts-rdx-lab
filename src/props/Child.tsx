interface ChildProps {
    color: string;
    onClick: () => void;
    children?: React.ReactNode;
}

export const Child = ({ color, onClick, children }: ChildProps) => {
    return (
        <div>
            {color}
            <button onClick={onClick}>Click</button>
            {children}
        </div>
    );
};

export const ChildAsFC: React.FC<ChildProps> = ({ color, onClick }) => {
    return (
        <div>
            {color}
            <button onClick={onClick}>Click</button>
        </div>
    );
};
