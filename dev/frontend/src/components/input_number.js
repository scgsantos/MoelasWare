function IncDecCounter(props) {
  const numberValidation = new RegExp("^[1-9][0-9]*$");

  let incNum = () => {
    props.setNum(Number(props.num) + 1);
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
        class="inputNumber"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div class="addDiv">
          <button className="addButton" type="button" onClick={decNum}>
            -
          </button>
        </div>
        <input
          type="text"
          class="formControl"
          value={props.num}
          onChange={handleChange}
        />
        <div class="subDiv">
          <button class="subButton" type="button" onClick={incNum}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default IncDecCounter;
