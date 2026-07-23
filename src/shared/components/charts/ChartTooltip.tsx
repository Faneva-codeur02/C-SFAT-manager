interface Props {

    active?: boolean;

    payload?: any[];

}

export default function ChartTooltip({

    active,

    payload,

}: Props) {

    if (

        !active ||

        !payload ||

        payload.length === 0

    ) return null;

    const item = payload[0];

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

            <p className="font-medium">

                {item.name}

            </p>

            <p className="text-sm text-muted-foreground">

                {item.value} %

            </p>

        </div>

    );

}