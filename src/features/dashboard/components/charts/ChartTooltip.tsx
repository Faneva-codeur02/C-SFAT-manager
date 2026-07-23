interface Props {

    active?: boolean;

    payload?: any[];

    label?: string;

}

export default function ChartTooltip({

    active,

    payload,

    label,

}: Props) {

    if (

        !active ||

        !payload ||

        payload.length === 0

    )

        return null;

    const value = Number(

        payload[0].value

    );

    return (

        <div
            className="
                rounded-xl
                border
                bg-background
                px-4
                py-3
                shadow-lg
            "
        >

            <p className="mb-2 text-xs text-muted-foreground">

                {label}

            </p>

            <p className="font-semibold">

                {value.toLocaleString()} Ar

            </p>

        </div>

    );

}