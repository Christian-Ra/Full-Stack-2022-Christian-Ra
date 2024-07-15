interface Part {
    name: string,
    exerciseCount: number
}

interface ContentProps{
    parts: Part[]
}

const Content = (props: ContentProps) => {
    return props.parts.map(p => (
        <p>{p.name} {p.exerciseCount}</p>
    ))
};

export default Content;