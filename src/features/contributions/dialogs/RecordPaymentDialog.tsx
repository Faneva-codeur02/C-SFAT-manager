import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import { useCreatePayment } from "../hooks/useCreatePayment";
import { useOutstandingBalance } from "../hooks/useOutstandingBalance";
import { getPaymentAllocations } from "../services/contributions.service";
import { generatePaymentReceipt } from "../services/generate-payment-receipt.service";
import type {
    Payment,
    PaymentAllocationWithPeriod,
    SelectedMember,
} from "../types/contribution.types";

const paymentSchema = z.object({

    amount: z
        .number({ message: "Montant invalide" })
        .positive("Le montant doit être positif"),

    payment_method: z.enum(
        ["cash", "mobile_money", "bank_transfer", "other"],
        { message: "Sélectionne un moyen de paiement" },
    ),

    payment_date: z.string().min(1, "La date est requise"),

    reference: z.string().optional(),

    note: z.string().optional(),

});

type PaymentFormValues = z.infer<typeof paymentSchema>;

type Props = {

    member: SelectedMember | null

    open: boolean;

    onOpenChange(open: boolean): void;

    onPaid(): void;

};

export default function RecordPaymentDialog({
    member,
    open,
    onOpenChange,
    onPaid,
}: Props) {

    const { submitPayment, submitting, error } =
        useCreatePayment();

    const profileId = member?.id;

    const { balance, loading: loadingBalance, reloadBalance } =
        useOutstandingBalance(profileId);

    const [completedPayment, setCompletedPayment] =
        useState<Payment | null>(null);

    const [receiptAllocations, setReceiptAllocations] =
        useState<PaymentAllocationWithPeriod[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PaymentFormValues>({

        resolver: zodResolver(paymentSchema),

        defaultValues: {

            amount: 0,

            payment_method: "cash",

            payment_date: new Date().toISOString().slice(0, 10),

            reference: "",

            note: "",

        },

    });

    // Pré-remplit le montant une fois le solde chargé (sans écraser
    // une saisie déjà en cours si le solde se recharge après coup)
    useEffect(() => {

        if (!loadingBalance) {

            setValue("amount", balance);

        }

    }, [loadingBalance]);

    async function onSubmit(values: PaymentFormValues) {

        if (!member) return;

        const payment = await submitPayment({

            profile_id: member.id,

            amount: values.amount,

            payment_method: values.payment_method,

            payment_date: values.payment_date,

            reference: values.reference || undefined,

            note: values.note || undefined,

        });

        if (payment) {

            const allocations =
                await getPaymentAllocations(payment.id);

            setReceiptAllocations(allocations);

            setCompletedPayment(payment);

            reloadBalance();

            onPaid();

        }

    }

    function handleClose(open: boolean) {

        if (!open) {

            reset();

            setCompletedPayment(null);

            setReceiptAllocations([]);

        }

        onOpenChange(open);

    }

    function handleDownloadReceipt() {

        if (!completedPayment || !member) return;

        generatePaymentReceipt(

            completedPayment,

            `${member.nom} ${member.prenom}`,

            member.member_number,

            receiptAllocations,

        );

    }

    if (!member) return null;

    return (

        <Dialog open={open} onOpenChange={handleClose}>

            <DialogContent>

                {completedPayment ? (

                    <>

                        <DialogHeader>

                            <DialogTitle>
                                Paiement enregistré ✅
                            </DialogTitle>

                        </DialogHeader>

                        <div className="text-sm space-y-1">

                            <p>

                                {member.nom} {member.prenom}

                            </p>

                            <p>

                                Montant payé : {completedPayment.amount.toLocaleString("fr-FR")} Ar

                            </p>

                            <p className="text-muted-foreground">

                                Réparti sur {receiptAllocations.length} période(s)

                            </p>

                        </div>

                        <DialogFooter className="gap-2">

                            <Button

                                variant="outline"

                                onClick={handleDownloadReceipt}

                            >

                                Télécharger le reçu

                            </Button>

                            <Button

                                onClick={() => handleClose(false)}

                            >

                                Fermer

                            </Button>

                        </DialogFooter>

                    </>

                ) : (

                    <>

                        <DialogHeader>

                            <DialogTitle>
                                Enregistrer un paiement
                            </DialogTitle>

                        </DialogHeader>

                        <div className="text-sm text-muted-foreground mb-2">

                            {member.nom} {member.prenom}
                            {" — "}
                            Total dû (toutes périodes impayées) :{" "}
                            {loadingBalance ? "..." : `${balance.toLocaleString("fr-FR")} Ar`}

                        </div>

                        {!loadingBalance && balance === 0 && (

                            <p className="text-sm text-muted-foreground mb-3">

                                Ce membre est à jour. Un paiement ici sera considéré comme une avance
                                pour la période suivante.

                            </p>

                        )}


                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >

                            <div>

                                <Label htmlFor="amount">Montant</Label>

                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    {...register("amount", { valueAsNumber: true })}
                                />

                                {errors.amount && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.amount.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="payment_method">Moyen de paiement</Label>

                                <Select

                                    value={watch("payment_method")}

                                    onValueChange={(value) => {

                                        if (value) {

                                            setValue(
                                                "payment_method",
                                                value as PaymentFormValues["payment_method"],
                                            );

                                        }

                                    }}

                                >

                                    <SelectTrigger id="payment_method" className="w-full">

                                        <SelectValue />

                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="cash">Espèces</SelectItem>

                                        <SelectItem value="mobile_money">Mobile Money</SelectItem>

                                        <SelectItem value="bank_transfer">Virement</SelectItem>

                                        <SelectItem value="other">Autre</SelectItem>

                                    </SelectContent>

                                </Select>

                                {errors.payment_method && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.payment_method.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="payment_date">Date</Label>

                                <Input
                                    id="payment_date"
                                    type="date"
                                    {...register("payment_date")}
                                />

                                {errors.payment_date && (

                                    <p className="text-sm text-destructive mt-1">
                                        {errors.payment_date.message}
                                    </p>

                                )}

                            </div>

                            <div>

                                <Label htmlFor="reference">Référence (optionnel)</Label>

                                <Input
                                    id="reference"
                                    {...register("reference")}
                                />

                            </div>

                            <div>

                                <Label htmlFor="note">Note (optionnel)</Label>

                                <Textarea
                                    id="note"
                                    {...register("note")}
                                />

                            </div>

                            {error && (

                                <p className="text-sm text-destructive">
                                    Une erreur est survenue : {error.message}
                                </p>

                            )}

                            <DialogFooter>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                >

                                    {submitting ? "Enregistrement..." : "Enregistrer"}

                                </Button>

                            </DialogFooter>

                        </form>



                    </>

                )}

            </DialogContent>

        </Dialog>

    );

}