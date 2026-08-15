type Props = {

    amountDue: number;

    amountPaid: number;

};

const PAID_COLOR = "#045959";
const PARTIAL_COLOR = "#D9AA1E";

export default function MonthSquares({ amountDue, amountPaid }: Props) {

    const weeklyAmount =
        amountDue > 0 ? amountDue / 4 : 0;

    const fullWeeksPaid =
        weeklyAmount > 0
            ? Math.min(4, Math.floor(amountPaid / weeklyAmount))
            : 0;

    const remainder =
        amountPaid - fullWeeksPaid * weeklyAmount;

    const hasPartialWeek =
        fullWeeksPaid < 4 && remainder > 0.01;

    return (

        <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-4 h-4">

            {Array.from({ length: 4 }).map((_, i) => {

                let color = "transparent";

                if (i < fullWeeksPaid) {

                    color = PAID_COLOR;

                } else if (i === fullWeeksPaid && hasPartialWeek) {

                    color = PARTIAL_COLOR;

                }

                return (

                    <div

                        key={i}

                        className="rounded-sm border border-border"

                        style={{ backgroundColor: color, width: "7px", height: "7px" }}

                    />

                );

            })}

        </div>

    );

}