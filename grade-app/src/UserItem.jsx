function UesrItem({user}) {
    return(
        <div className="user-item">
            <span>{user.name}</span>
            <strong>{user.point.toLocalString()} P </strong>
        </div>
    )
}

export default UesrItem