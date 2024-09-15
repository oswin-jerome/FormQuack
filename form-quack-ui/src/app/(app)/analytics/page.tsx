import { getAllMonthlySubmissions } from "@/actions/analytics";
import { TrendChart } from "./TrendsChart";

const DashboardPage = async () => {
  const data = (await getAllMonthlySubmissions()).data;
  return (
    <main>
      <TrendChart data={data} />
    </main>
  );
};

export default DashboardPage;
