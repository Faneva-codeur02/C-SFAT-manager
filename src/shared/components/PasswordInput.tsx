import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/utils/utils";

type Props = React.ComponentProps<typeof Input>;

const PasswordInput = forwardRef<HTMLInputElement, Props>(

    ({ className, ...props }, ref) => {

        const [visible, setVisible] = useState(false);

        return (

            <div className="relative">

                <Input

                    ref={ref}

                    type={visible ? "text" : "password"}

                    className={cn("pr-10", className)}

                    {...props}

                />

                <button

                    type="button"

                    onClick={() => setVisible((v) => !v)}

                    tabIndex={-1}

                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"

                >

                    {visible ? (

                        <EyeOff className="h-4 w-4" />

                    ) : (

                        <Eye className="h-4 w-4" />

                    )}

                </button>

            </div>

        );

    },

);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;