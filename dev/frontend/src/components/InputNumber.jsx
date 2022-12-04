function IncDecCounter(props) {
  const numberValidation = new RegExp("^([1-9][0-9]{0,2})$");

  let incNum = () => {
    if (props.num < 999) {
      props.setNum(Number(props.num) + 1);
    }
  };

  let decNum = () => {
    if (props.num > 1) {
      props.setNum(props.num - 1);
    }
  };

  let handleChange = (e) => {
    if (numberValidation.test(e.target.value)) {
      props.setNum(e.target.value);
    } else {
      props.setNum(1);
    }
  };

  return (
    <>
      <h1 className="inputNumberTitle">{props.label}</h1>
      <div
        className="inputNumber"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="addDiv">
          <button className="addButton" type="button" onClick={decNum}>
            -
          </button>&nbsp;
        </div>
        <input
          type="text"
          className="formControl"
          value={props.num}
          onChange={handleChange}
        />
        <div className="subDiv">
          <button className="subButton" type="button" onClick={incNum}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default IncDecCounter;
