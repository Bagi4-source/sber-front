import { Button } from "src/components";

export const DemoPage = () => {
  return (
    <div>
      <Button onClick={() => console.log("afafaf")}>Отправить</Button>
      <Button onClick={() => console.log("afafaf")} disabled>
        Отправить
      </Button>
    </div>
  );
};
