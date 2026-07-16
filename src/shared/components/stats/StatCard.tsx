import { Card } from "@/shared/components/ui/card";

interface Props {

    title: string;

    value: number;

    color?: string;

}

export default function StatCard({

    title,

    value,

    color,

}: Props) {

    return (

        <Card className="p-5">

            <p className="text-sm text-muted-foreground">

                {title}

            </p>

            <p
                className={`text-3xl font-bold ${color}`}
            >

                {value}

            </p>

        </Card>

    );

}