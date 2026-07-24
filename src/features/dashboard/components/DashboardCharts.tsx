import MonthlyContributionChart from "./MonthlyContributionChart";
import MemberEvolutionChart from "./MemberEvolutionChart";
import PaymentCategoryChart from "./PaymentCategoryChart";

import type {

    DashboardData,

} from "../types/dashboard.types";

interface Props {

    data: DashboardData;

}

export default function DashboardCharts({

    data,

}: Props) {

    return (

        <div className="space-y-6">

            <MonthlyContributionChart

                data={data.monthlyContributions}

            />

            <div className="grid gap-6 xl:grid-cols-2">

                <MemberEvolutionChart

                    data={data.memberEvolution}

                />

                <PaymentCategoryChart

                    data={data.paymentCategories}

                />

            </div>

        </div>

    );

}