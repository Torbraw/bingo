import { type LangKeys } from '@/lib/config';
import { buildBingoCombinaisons, useTranslations } from '@/lib/utils';
import { splitProps, type Component, createSignal, Show, For, onMount } from 'solid-js';
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';

type Props = {
  lang: LangKeys;
};

export const Draw: Component<Props> = (componentProps) => {
  const [local, _rest] = splitProps(componentProps, ['lang']);
  // eslint-disable-next-line solid/reactivity
  const t = useTranslations(local.lang);
  const [combinations, setCombinations] = createSignal<string[]>([]);
  const [drawnCombinations, setDrawnCombinations] = createSignal<string[]>([]);

  const handleDraw = () => {
    const combinationsArray = combinations();
    const random = Math.floor(Math.random() * combinationsArray.length);
    const drawn = combinationsArray.splice(random, 1);

    setDrawnCombinations((prev) => [drawn[0], ...prev]);
    setCombinations([...combinationsArray]);
  };

  const reset = () => {
    setCombinations(buildBingoCombinaisons());
    setDrawnCombinations([]);
  };

  onMount(() => {
    setCombinations(buildBingoCombinaisons());
  });

  return (
    <div class="flex justify-center p-6">
      <div class="flex w-full max-w-2xl flex-col gap-6">
        <Button class="w-full" onclick={() => handleDraw()} disabled={combinations().length === 0}>
          {t('draw')}
        </Button>
        <Show when={combinations().length === 0}>
          <p class="text-center text-xl">{t('allDrawned')}</p>
          <Button onclick={() => reset()}>{t('reset')}</Button>
        </Show>
        <For each={drawnCombinations()}>
          {(combinaison) => (
            <Card>
              <CardHeader class="text-center text-5xl font-bold">{combinaison}</CardHeader>
            </Card>
          )}
        </For>
      </div>
    </div>
  );
};
