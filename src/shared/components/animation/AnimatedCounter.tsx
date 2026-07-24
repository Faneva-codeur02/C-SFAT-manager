import {
    animate,
    useMotionValue,
} from "framer-motion";

import {
    useEffect,
    useState,
} from "react";

interface Props {

    value: number;

    duration?: number;

    prefix?: string;

    suffix?: string;

}

export default function AnimatedCounter({

    value,

    duration = 1.5,

    prefix = "",

    suffix = "",

}: Props) {

    const motionValue = useMotionValue(0);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {

        const controls = animate(

            motionValue,

            value,

            {

                duration,

                ease: "easeOut",

                onUpdate(latest) {

                    setDisplayValue(

                        Math.round(latest)

                    );

                },

            }

        );

        return () => controls.stop();

    }, [

        value,

        duration,

        motionValue,

    ]);

    return (

        <span>

            {prefix}

            {displayValue.toLocaleString("fr-FR")}

            {suffix}

        </span>

    );

}