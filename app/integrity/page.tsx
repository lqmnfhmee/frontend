import { getIntegrityDashboard } from "../../lib/api/integrity";

import IntegritySummary from "../components/Integrity/IntegritySummary";
import RiskMatrixSection from "../components/Integrity/RiskMatrixSection";
import CriticalAssetsTable from "../components/Integrity/CriticalAssetsTable";
import IntegrityTrends from "../components/Integrity/IntegrityTrends";
import IntegrityDistributions from "../components/Integrity/IntegrityDistribution";
import IntegrityFilters from "../components/Integrity/IntegrityFilters";

export default async function IntegrityPage() {
  const data = await getIntegrityDashboard();

  return (
    <div className="space-y-8">
      <IntegritySummary data={data.summary} />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <RiskMatrixSection data={data.riskMatrix} />
        </div>

        <div className="xl:col-span-2">
          <CriticalAssetsTable data={data.criticalAssets} />
        </div>
      </div>

      <IntegrityTrends data={data.trends} />
      <IntegrityDistributions data={data.distributions} />
      <IntegrityFilters />
    </div>
  );
}