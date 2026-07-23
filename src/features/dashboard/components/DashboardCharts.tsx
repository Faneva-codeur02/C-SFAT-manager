import MemberEvolutionChart from "./MemberEvolutionChart";
import MonthlyContributionChart from "./MonthlyContributionChart";
import PaymentCategoryChart from "./PaymentCategoryChart";

export default function DashboardCharts() {

    return (

        <section className="space-y-6">

            {/* Grand graphique */}

            <MonthlyContributionChart />

            {/* Deux graphiques secondaires */}

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >
                <MemberEvolutionChart />
                <PaymentCategoryChart />


            </div>

        </section>

    );

}