import { Button, Select } from "src/components";

const options = [
  {
    value: "1",
    name: "1",
  },
  {
    value: "2",
    name: "2",
  },
  {
    value: "3",
    name: "3",
  },
];

export const DemoPage = () => {
  return (
    <div style={{ display: "inline-flex", gap: "10px" }}>
      <Select options={options} />
      <Button onClick={() => console.log("afafaf")}>Отправить</Button>
    </div>
  );
};
