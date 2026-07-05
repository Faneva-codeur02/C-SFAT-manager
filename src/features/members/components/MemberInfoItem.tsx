interface Props {

    label: string;

    value?: string | null;

}

export default function MemberInfoItem({

    label,

    value,

}: Props) {

    return (

        <div className="space-y-1">

            <p className="text-xs text-muted-foreground uppercase tracking-wide">

                {label}

            </p>

            <p className="font-medium">

                {value || "-"}

            </p>

        </div>

    );

}