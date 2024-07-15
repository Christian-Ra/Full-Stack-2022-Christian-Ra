interface HeadingProps {
    heading: string
}

const Heading = (props: HeadingProps) => {
    return <h1>{props.heading}</h1>
}

export default Heading;