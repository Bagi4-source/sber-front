import { Button, MessageText, Select } from "src/components";
import {
  type Option,
  useGetOptionsQuery,
  usePostSelectedOptionMutation,
} from "src/store/optionsApi.ts";
import { useState } from "react";
import { getErrorMessage } from "src/utils";
import css from "./Demo.page.module.scss";

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
    <div className={css.mainWrapper}>
      <div className={css.centered}>
        <div className={css.formWrapper}>
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
        <MessageText>
          {isSubmitError
            ? getErrorMessage(submitError)
            : serverMessage?.message}
        </MessageText>
      </div>
    </div>
  );
};
