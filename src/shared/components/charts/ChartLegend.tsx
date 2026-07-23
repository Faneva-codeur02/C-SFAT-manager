interface Props {

    color: string;

    label: string;

}

export default function ChartLegend({

    color,

    label,

}: Props) {

    return (

        <div className="flex items-center gap-2">

            <span

                className="h-3 w-3 rounded-full"

                style={{

                    backgroundColor: color,

                }}

            />

            <span className="text-sm text-muted-foreground">

                {label}

            </span>

        </div>

    );

}