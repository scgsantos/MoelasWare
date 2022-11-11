
export const LeaveTest = (props) => {
    return (
        <div className='popupInside'>
            <span>Do you wish to return to test selection?</span>
            <span>Your progress will be saved</span>
            <div className="">
                <button onClick={props.onClick}>Yes</button>
                <button >No</button>
            </div>
        </div>
    )
}