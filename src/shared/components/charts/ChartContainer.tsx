import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/utils";

interface Props {

    title: string;

    description?: string;

    children: React.ReactNode;

    className?: string;

}

export default function ChartContainer({

    title,

    description,

    children,

    className,

}: Props) {

    return (

        <Card className={cn("overflow-hidden", className)}>

            <CardHeader>

                <CardTitle>

                    {title}

                </CardTitle>

                {

                    description && (

                        <p className="text-sm text-muted-foreground">

                            {description}

                        </p>

                    )

                }

            </CardHeader>

            <CardContent>

                <div className="h-80 w-full">

                    {children}

                </div>

            </CardContent>

        </Card>

    );

}