import { Button, Select } from "src/components";
import {
  type Option,
  useGetOptionsQuery,
  usePostSelectedOptionMutation,
} from "src/store/optionsApi.ts";
import { useState } from "react";
import { getErrorMessage } from "src/utils";

export const DemoPage = () => {
  const { data: options = [], isLoading } = useGetOptionsQuery();
  const [
    postSelectedOption,
    {
      isLoading: isSubmitting,
      isError: isSubmitError,
      error: submitError,
      data: serverMessage,
    },
  ] = usePostSelectedOptionMutation();
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const handleSubmit = async () => {
    if (!selectedValue) return;

    postSelectedOption({
      selectedOption: { value: selectedValue?.value },
    }).then(() => {
      setSelectedValue(null);
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 350,
          maxWidth: 350,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Select
            options={options}
            value={selectedValue}
            onSelect={setSelectedValue}
            placeholder={isLoading ? "Загрузка данных..." : "Выберите значение"}
          />
          <Button
            disabled={isLoading || isSubmitting || !selectedValue}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          {isSubmitError
            ? getErrorMessage(submitError)
            : serverMessage?.message}
        </div>
      </div>
    </div>
  );
};
