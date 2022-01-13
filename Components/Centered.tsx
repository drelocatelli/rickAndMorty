export default function (props) {
    return(
        <div className={`centered ${props.className ?? ''}`}>
            {props.children}
        </div>
    )
}