import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

// flex-grow-1はTwindv0.16で変換されるがTwindv1で変換されないので
// flex-growに書き直している。
// https://v2.tailwindcss.com/docs/flex-grow
// v3なら grow
// https://tailwindcss.com/docs/flex-grow
export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  return (
    <div class="flex gap-2 w-full">
      <p class="grow font-bold text-xl">{count}</p>
      <Button onClick={() => setCount(count - 1)}>-1</Button>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  );
}
