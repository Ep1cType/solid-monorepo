import { Title } from "solid-start";
import { useUserContext } from "~/entities/user/model";
import { createEffect, createResource, For, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";

export default function User() {
  const [state, setState] = useUserContext();

  return (
    <main>
      <Title>User</Title>
      <h2 class="text-xl">очень странно</h2>
      <p>Количество пользователей: {state.userCount}</p>
      <button
        class="rounded bg-red-500 text-xl hover:underline sm:text-2xl"
        onclick={() => setState.setUserCount(state.userCount + 1)}
      >
        ТЫК
      </button>
      <button onclick={() => setState.refetchUsers()}>
        Загрузить пользователей !
      </button>

      <Show when={state.userList.length} fallback={<p>Loading...</p>}>
        <ul>
          <For each={state.userList}>{(user) => <li>{user.name}</li>}</For>
        </ul>
      </Show>
    </main>
  );
}
