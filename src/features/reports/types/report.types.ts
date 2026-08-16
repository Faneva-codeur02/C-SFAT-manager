export interface CategoryReportRow {

    categoryId: string;

    categoryName: string;

    categoryType: "income" | "expense";

    total: number;

}

export interface ContributionRateSummary {

    totalDue: number;

    totalPaid: number;

    memberCountUpToDate: number;

    memberCountLate: number;

}

export interface MemberArrearsRow {

    profileId: string;

    nom: string;

    prenom: string;

    memberNumber: string | null;

    monthsOwed: number;

    totalOwed: number;

}