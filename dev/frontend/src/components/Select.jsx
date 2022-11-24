import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dropdown(props) {
  const options = [
    { label: "USERS", value: "users" },
    { label: "TESTS", value: "tests" },
  ];

  const navigate = useNavigate();
  let option = { label: "", value: "" };
  props.selected === "users" ? (option = options[0]) : (option = options[1]);
  const [selectedOption, setSelectedOption] = useState(option);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    navigate(`../${selectedOption.target.value}`);
  };

  return (
    <select onChange={handleChange} value={selectedOption.value}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
