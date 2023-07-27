import { createContext, createEffect, createResource, createSignal, ParentComponent, useContext } from "solid-js";
import { createStore } from "solid-js/store";

interface UserStore {
  userList: any[];
  userCount: number;
}

const initialValues: UserStore = {
  userList: [],
  userCount: 0,
};

const fetchUserList = async () => {
  return (await fetch(`https://jsonplaceholder.typicode.com/users`)).json();
};

export const makeUserContext = () => {
  const [users, { refetch, mutate }] = createResource<any[]>(fetchUserList);
  const [state, setState] = createStore(initialValues);

  function setUserList(userList: any[]) {
    setState("userList", () => userList);
  }

  function setUserCount(count: number) {
    setState("userCount", () => count);
  }

  users();

  function refetchUsers() {
    refetch();
  }

  createEffect(() => {
    setUserList(users() || []);
  });

  return [state, { setUserList, setUserCount, refetchUsers }] as const;
};

type UserContextType = ReturnType<typeof makeUserContext>;
export const UserContext = createContext<UserContextType>(makeUserContext());
export const useUserContext = () => useContext(UserContext);


export const UserProvider: ParentComponent = (props) => {
  return (
    <UserContext.Provider value={makeUserContext()}>
      {props.children}
    </UserContext.Provider>
  );
};