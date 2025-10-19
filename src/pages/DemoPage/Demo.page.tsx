import { Button, Select } from "src/components";

const options = Array(10000)
  .fill(0)
  .map((_, i) => ({
    value: String(i),
    name: String(i),
  }));

export const DemoPage = () => {
  return (
    <div style={{ display: "inline-flex", gap: "10px" }}>
      <Select options={options} placeholder={"Выберите значение"} />
      <Button onClick={() => console.log("afafaf")}>Отправить</Button>
    </div>
  );
};
