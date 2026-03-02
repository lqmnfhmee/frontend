// lib/api/integrity.ts

type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

type MatrixCell = {
  row: number;
  column: string;
  riskLevel: RiskLevel;
  count: number;
};

type MatrixGroup = {
  matrix: MatrixCell[];
};

type CriticalAsset = {
  assetId: string;
  assetTag: string;
  assetName: string;
  facility: string;
  rbi?: {
    riskLevel: RiskLevel;
  };
  inspection?: {
    remainingLifeYears: number;
    isOverdue: boolean;
  };
  anomalies?: {
    activeCount: number;
    highPriorityCount: number;
  };
};

export async function getIntegrityDashboard(): Promise<{
  summary: {
    totalAssets: number;
    highRiskAssets: number;
    assetsNotAssessed: number;
    activeAnomalies: number;
    highPriorityAnomalies: number;
    overdueInspections: number;
    assetsBelowLifeThreshold: number;
  };
  riskMatrix: {
    total: MatrixGroup;
    vessel: MatrixGroup;
    piping: MatrixGroup;
  };
  // ✅ FIXED CORRECTLY
  criticalAssets: CriticalAsset[];
  trends: {
    monthly: {
      month: string;
      newAnomalies: number;
      inspectionsCompleted: number;
      riskLevelChanges: number;
    }[];
  };
  distributions: {
    anomalyPriority: {
      P1: number;
      P2: number;
      P3: number;
      P4: number;
    };
    workcenterLoad: {
      name: string;
      count: number;
    }[];
    recommendationSummary: {
      type: string;
      count: number;
    }[];
  };
}> {

  // -----------------------------
  // Vessel Matrix
  // -----------------------------
  const vesselMatrix: MatrixCell[] = [
    { row: 5, column: "A", riskLevel: "LOW", count: 0 },
    { row: 5, column: "B", riskLevel: "MEDIUM", count: 1 },
    { row: 5, column: "C", riskLevel: "HIGH", count: 1 },
    { row: 5, column: "D", riskLevel: "VERY_HIGH", count: 2 },
    { row: 5, column: "E", riskLevel: "VERY_HIGH", count: 1 },

    { row: 4, column: "A", riskLevel: "LOW", count: 1 },
    { row: 4, column: "B", riskLevel: "MEDIUM", count: 1 },
    { row: 4, column: "C", riskLevel: "HIGH", count: 1 },
    { row: 4, column: "D", riskLevel: "HIGH", count: 0 },
    { row: 4, column: "E", riskLevel: "VERY_HIGH", count: 1 },

    { row: 3, column: "A", riskLevel: "LOW", count: 2 },
    { row: 3, column: "B", riskLevel: "LOW", count: 1 },
    { row: 3, column: "C", riskLevel: "MEDIUM", count: 1 },
    { row: 3, column: "D", riskLevel: "HIGH", count: 0 },
    { row: 3, column: "E", riskLevel: "HIGH", count: 1 },

    { row: 2, column: "A", riskLevel: "LOW", count: 1 },
    { row: 2, column: "B", riskLevel: "LOW", count: 1 },
    { row: 2, column: "C", riskLevel: "LOW", count: 0 },
    { row: 2, column: "D", riskLevel: "MEDIUM", count: 1 },
    { row: 2, column: "E", riskLevel: "MEDIUM", count: 0 },

    { row: 1, column: "A", riskLevel: "LOW", count: 1 },
    { row: 1, column: "B", riskLevel: "LOW", count: 0 },
    { row: 1, column: "C", riskLevel: "LOW", count: 0 },
    { row: 1, column: "D", riskLevel: "LOW", count: 0 },
    { row: 1, column: "E", riskLevel: "MEDIUM", count: 0 },
  ];

  // -----------------------------
  // Piping Matrix
  // -----------------------------
  const pipingMatrix: MatrixCell[] = [
    { row: 5, column: "A", riskLevel: "LOW", count: 0 },
    { row: 5, column: "B", riskLevel: "MEDIUM", count: 0 },
    { row: 5, column: "C", riskLevel: "HIGH", count: 1 },
    { row: 5, column: "D", riskLevel: "VERY_HIGH", count: 1 },
    { row: 5, column: "E", riskLevel: "VERY_HIGH", count: 1 },

    { row: 4, column: "A", riskLevel: "LOW", count: 1 },
    { row: 4, column: "B", riskLevel: "MEDIUM", count: 1 },
    { row: 4, column: "C", riskLevel: "HIGH", count: 0 },
    { row: 4, column: "D", riskLevel: "HIGH", count: 1 },
    { row: 4, column: "E", riskLevel: "VERY_HIGH", count: 0 },

    { row: 3, column: "A", riskLevel: "LOW", count: 1 },
    { row: 3, column: "B", riskLevel: "LOW", count: 1 },
    { row: 3, column: "C", riskLevel: "MEDIUM", count: 1 },
    { row: 3, column: "D", riskLevel: "HIGH", count: 1 },
    { row: 3, column: "E", riskLevel: "HIGH", count: 0 },

    { row: 2, column: "A", riskLevel: "LOW", count: 1 },
    { row: 2, column: "B", riskLevel: "LOW", count: 0 },
    { row: 2, column: "C", riskLevel: "LOW", count: 1 },
    { row: 2, column: "D", riskLevel: "MEDIUM", count: 0 },
    { row: 2, column: "E", riskLevel: "MEDIUM", count: 0 },

    { row: 1, column: "A", riskLevel: "LOW", count: 0 },
    { row: 1, column: "B", riskLevel: "LOW", count: 0 },
    { row: 1, column: "C", riskLevel: "LOW", count: 0 },
    { row: 1, column: "D", riskLevel: "LOW", count: 0 },
    { row: 1, column: "E", riskLevel: "MEDIUM", count: 0 },
  ];

  // -----------------------------
  // Total = Vessel + Piping
  // -----------------------------
  const totalMatrix: MatrixCell[] = vesselMatrix.map((cell) => {
    const pipingCell = pipingMatrix.find(
      (p) => p.row === cell.row && p.column === cell.column
    );

    return {
      ...cell,
      count: cell.count + (pipingCell?.count ?? 0),
    };
  });

  return {
    summary: {
      totalAssets: 124,
      highRiskAssets: 8,
      assetsNotAssessed: 3,
      activeAnomalies: 15,
      highPriorityAnomalies: 5,
      overdueInspections: 4,
      assetsBelowLifeThreshold: 6,
    },

    riskMatrix: {
      total: { matrix: totalMatrix },
      vessel: { matrix: vesselMatrix },
      piping: { matrix: pipingMatrix },
    },

    criticalAssets: [],

    trends: {
      monthly: [],
    },

    distributions: {
      anomalyPriority: { P1: 2, P2: 3, P3: 6, P4: 4 },
      workcenterLoad: [],
      recommendationSummary: [],
    },
  };
}