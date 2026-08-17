export function buildCalendarDays(year: number, month: number): Date[] {

    const firstOfMonth = new Date(year, month, 1);

    const lastOfMonth = new Date(year, month + 1, 0);

    // Lundi = 1, ..., Dimanche = 0 → on décale pour que lundi soit le début de grille
    const leadingOffset = (firstOfMonth.getDay() + 6) % 7;

    const trailingOffset = (7 - ((lastOfMonth.getDay() + 6) % 7 + 1)) % 7;

    const start = new Date(firstOfMonth);

    start.setDate(start.getDate() - leadingOffset);

    const end = new Date(lastOfMonth);

    end.setDate(end.getDate() + trailingOffset);

    const days: Date[] = [];

    const cursor = new Date(start);

    while (cursor <= end) {

        days.push(new Date(cursor));

        cursor.setDate(cursor.getDate() + 1);

    }

    return days;

}

export function toDateKey(date: Date): string {

    return date.toISOString().slice(0, 10);

}