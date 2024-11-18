import { createSignal, onMount, splitProps, type Component } from 'solid-js';
import { Input } from '../ui/input';
import { DEFAULT_VALUE, MAX_VALUE, MIN_VALUE, STORAGE_NAME } from '@/lib/config';

type Props = {
  class?: string;
};

export const MaxNumber: Component<Props> = (componentProps) => {
  const [local, _rest] = splitProps(componentProps, ['class']);

  const [value, setValue] = createSignal(0);

  const handleOnChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => {
    let targetValue = Number.parseInt(e.currentTarget.value) || 0;
    if (targetValue < MIN_VALUE) {
      targetValue = MIN_VALUE;
    } else if (targetValue > MAX_VALUE) {
      targetValue = MAX_VALUE;
    }

    setValue(targetValue);
    localStorage.setItem(STORAGE_NAME, targetValue.toString());
  };

  onMount(() => {
    const storedValue = localStorage.getItem(STORAGE_NAME);
    if (storedValue) {
      setValue(Number.parseInt(storedValue));
    } else {
      setValue(DEFAULT_VALUE);
    }
  });

  return (
    <Input
      classList={{ 'w-32': true, [local.class ?? '']: true }}
      type="number"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={value()}
      onInput={(e) => handleOnChange(e)}
    />
  );
};
