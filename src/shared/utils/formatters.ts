/**
 * Formate un nombre
 * 12500 -> 12 500
 */
export function formatNumber(value: number): string {

    return new Intl.NumberFormat("fr-FR").format(value);

}

/**
 * Formate une monnaie
 * 12500 -> 12 500 Ar
 */
export function formatCurrency(
    value: number,
    currency = "Ar",
): string {

    return `${formatNumber(value)} ${currency}`;

}

/**
 * Pourcentages
 */
export function formatPercent(value: number): string {

    return `${value >= 0 ? "+" : ""}${value}%`;

}

/**
 * Date courte
 * 2026-07-15
 * ->
 * 15 juil. 2026
 */
export function formatDate(
    date: string | Date,
): string {

    return new Intl.DateTimeFormat(

        "fr-FR",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }

    ).format(new Date(date));

}

/**
 * Heure
 * 14:30
 */
export function formatTime(
    date: string | Date,
): string {

    return new Intl.DateTimeFormat(

        "fr-FR",

        {

            hour: "2-digit",

            minute: "2-digit",

        }

    ).format(new Date(date));

}

/**
 * Date + heure
 */
export function formatDateTime(
    date: string | Date,
): string {

    return new Intl.DateTimeFormat(

        "fr-FR",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

        }

    ).format(new Date(date));

}