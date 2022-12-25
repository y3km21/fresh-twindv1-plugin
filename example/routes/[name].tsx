import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return <div class="text-red-400">Hello {props.params.name}</div>;
}
