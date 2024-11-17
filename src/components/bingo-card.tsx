import { type Component, createSignal, For, onMount, splitProps } from 'solid-js';
import { Card, CardContent, CardHeader } from './ui/card';
import { bingoCombinations, type LangKeys } from '@/lib/config';
import { Button } from './ui/button';
import { useTranslations } from '@/lib/utils';

type Props = {
  lang: LangKeys;
};

export const BingoCard: Component<Props> = (componentProps) => {
  const [local, _rest] = splitProps(componentProps, ['lang']);
  // eslint-disable-next-line solid/reactivity
  const t = useTranslations(local.lang);

  const [finalCombinations, setFinalCombinations] = createSignal<string[]>([]);
  const matrix = {
    0: 'B',
    1: 'I',
    2: 'N',
    3: 'G',
    4: 'O',
  };

  const draw = () => {
    const drawnedCombinations = [];

    for (let i = 0; i < 5; i++) {
      const combinations = bingoCombinations.filter((c) => c.startsWith(matrix[i as keyof typeof matrix]));

      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
          drawnedCombinations.push('FREE');
          continue;
        }

        const index = Math.floor(Math.random() * combinations.length);
        const combination = combinations[index];
        drawnedCombinations.push(combination.split('-')[1]);
        combinations.splice(index, 1);
      }
    }
    setFinalCombinations(drawnedCombinations);
  };

  const onPrint = () => {
    window.print();
  };

  onMount(() => {
    draw();
  });

  return (
    <div class="flex w-full max-w-2xl flex-col items-center gap-10">
      <div class="flex w-full gap-6 print:hidden">
        <Button class="flex-1" id="refresh-btn" onClick={draw}>
          {t('regenerateCard')}
        </Button>
        <Button class="flex-1" id="print-btn" onClick={onPrint}>
          {t('print')}
        </Button>
      </div>
      <Card class="max-w-fit print:border-neutral-950 print:text-neutral-950">
        <CardHeader>
          <div class="grid grid-flow-col grid-cols-5">
            <For each={Object.values(matrix)}>
              {(letter) => (
                <div class="flex h-10 w-10 items-center justify-center text-xl font-bold print:w-20 md:w-20">
                  {letter}
                </div>
              )}
            </For>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-flow-col grid-cols-5 grid-rows-5">
            <For each={finalCombinations()}>
              {(combination) => (
                <div class="flex h-10 w-10 items-center justify-center border text-xl font-bold print:h-20 print:w-20 print:border-neutral-950 md:h-20 md:w-20">
                  {combination}
                </div>
              )}
            </For>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
