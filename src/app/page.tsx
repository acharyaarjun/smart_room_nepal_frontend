import { Home } from "@/components/home";
import { getDistricts } from "@/services/userService";
import { District } from "@/types/user/district";

export default async function page() {
  // Fetch districts  on the server
  const [districtsData] = await Promise.all([getDistricts()]);

  const districts: District[] = districtsData?.data.data || [];

  return <Home districts={districts} />;
}
