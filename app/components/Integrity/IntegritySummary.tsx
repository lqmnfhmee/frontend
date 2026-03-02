"use client";

import IntegrityKpiCard from "./IntegrityKpiCard";
import {
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
  Package,
  HelpCircle,
} from "lucide-react";

interface Props {
  data: {
    totalAssets: number;
    highRiskAssets: number;
    activeAnomalies: number;
    overdueInspections: number;
    assetsBelowLifeThreshold: number;
    assetsNotAssessed: number;
  };
}

export default function IntegritySummary({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
      <IntegrityKpiCard
        title="Total Assets"
        value={data.totalAssets}
        icon={<Package size={22} />}
      />

      <IntegrityKpiCard
        title="High Risk Assets"
        value={data.highRiskAssets}
        variant="danger"
        icon={<ShieldAlert size={22} />}
      />

      <IntegrityKpiCard
        title="Active Anomalies"
        value={data.activeAnomalies}
        variant="warning"
        icon={<AlertTriangle size={22} />}
      />

      <IntegrityKpiCard
        title="Overdue Inspections"
        value={data.overdueInspections}
        variant="warning"
        icon={<ClipboardList size={22} />}
      />

      <IntegrityKpiCard
        title="<10yr Remaining Life"
        value={data.assetsBelowLifeThreshold}
        variant="info"
        icon={<AlertTriangle size={22} />}
      />

      <IntegrityKpiCard
        title="Not Assessed (RBI)"
        value={data.assetsNotAssessed}
        variant="info"
        icon={<HelpCircle size={22} />}
      />
    </div>
  );
}