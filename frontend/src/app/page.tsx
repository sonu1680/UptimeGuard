import { auth, signIn } from "@/lib/auth";

export default async function page() {

  const session=await auth();
if(session){

  console.log(session)
}
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
   
      <button type="submit">Signin with Google</button>
    </form>
  );
}
