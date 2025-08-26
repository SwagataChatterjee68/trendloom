import Navbar from "./Navbar";
import { getAuth } from "@/helper/getAuth";

export default async function NavbarWrapper() {
  const user = await getAuth();
  return <Navbar user={user} />;
}
