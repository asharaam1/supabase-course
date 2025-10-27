import { useEffect, useState } from "react";
import Auth from "./Auth";
import TaskManager from "./TaskManager";
import { supabase } from "./supabase-client";

export default function App() {
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    fetchUserSession();

    const { data: authListner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserSession(session);
      }
    );

    return () => {
      authListner.subscription.unsubscribe();
    };
  }, []);

  const fetchUserSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession.data.session);
    setUserSession(currentSession.data.session);
  };

  const logOutHandler = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {userSession ? (
        <>
          <TaskManager session={userSession}/>
          <button onClick={logOutHandler}>Logout</button>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}
