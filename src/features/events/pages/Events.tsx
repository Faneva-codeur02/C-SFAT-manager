import { useEffect, useState } from "react";

import AppLayout from "@/app/layouts/AppLayout";
import { Button } from "@/shared/components/ui/button";
import Pagination from "@/shared/components/Pagination";
import ConfirmActionDialog from "@/shared/components/dialogs/ConfirmActionDialog";
import { usePagination } from "@/shared/hooks/usePagination";

import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/auth/permissions";

import EventFormDialog from "@/features/events/dialogs/EventFormDialog";
import EventDetailsDialog from "@/features/events/dialogs/EventDetailsDialog";
import EventsTable from "@/features/events/components/EventsTable";
import EventsFiltersBar from "@/features/events/components/EventsFiltersBar";
import { useEvents } from "@/features/events/hooks/useEvents";
import { useEventFilters } from "@/features/events/hooks/useEventFilters";
import { useEventDialogs } from "@/features/events/hooks/useEventDialogs";
import { useDeleteEvent } from "@/features/events/hooks/useDeleteEvent";

import { LayoutList, CalendarDays } from "lucide-react";
import EventsCalendar from "@/features/events/components/EventsCalendar";

export default function Events() {

    const { can } = usePermission();

    const canCreate = can(PERMISSIONS.EVENTS_CREATE);

    const [view, setView] = useState<"list" | "calendar">("list");

    const filters = useEventFilters();

    const pagination = usePagination();

    const {
        events,
        total,
        loading,
        loadEvents,
    } = useEvents(
        filters,
        pagination,
    );

    const dialogs = useEventDialogs();

    const { remove, deleting } = useDeleteEvent();

    useEffect(() => {

        pagination.setPage(0);

    }, [filters.eventType, filters.status]);

    async function handleConfirmDelete() {

        if (!dialogs.selectedEvent) return;

        const success = await remove(dialogs.selectedEvent.id);

        if (success) {

            dialogs.closeDialog();

            loadEvents();

        }

    }

    return (

        <AppLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Évènements
                </h1>

                {canCreate && (

                    <Button onClick={dialogs.openCreate}>

                        Nouvel évènement

                    </Button>

                )}

            </div>

            <EventsFiltersBar

                eventType={filters.eventType}

                status={filters.status}

                onTypeChange={filters.setEventType}

                onStatusChange={filters.setStatus}

            />

            <div className="flex gap-2 mb-4">

                <Button

                    variant={view === "list" ? "default" : "outline"}

                    size="sm"

                    onClick={() => setView("list")}

                >

                    <LayoutList className="h-4 w-4 mr-2" />

                    Liste

                </Button>

                <Button

                    variant={view === "calendar" ? "default" : "outline"}

                    size="sm"

                    onClick={() => setView("calendar")}

                >

                    <CalendarDays className="h-4 w-4 mr-2" />

                    Calendrier

                </Button>

            </div>

            {view === "list" ? (

                <>

                    {loading ? (

                        <p className="text-muted-foreground">Chargement...</p>

                    ) : (

                        <EventsTable

                            events={events}

                            onChanged={loadEvents}

                            onView={dialogs.openDetails}

                            onEdit={dialogs.openEdit}

                            onDelete={dialogs.openDelete}

                        />

                    )}

                    <Pagination

                        page={pagination.page}

                        pageSize={pagination.pageSize}

                        total={total}

                        itemLabel="évènement(s)"

                        onPageChange={pagination.setPage}

                        onPageSizeChange={pagination.setPageSize}

                    />

                </>

            ) : (

                <EventsCalendar

                    eventType={filters.eventType}

                    status={filters.status}

                    onEventClick={dialogs.openDetails}

                />

            )}

            <EventFormDialog

                event={dialogs.dialogType === "form" ? dialogs.selectedEvent : null}

                open={dialogs.dialogType === "form"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

                onSaved={loadEvents}

            />

            <EventDetailsDialog

                event={dialogs.selectedEvent}

                open={dialogs.dialogType === "details"}

                onOpenChange={(open) => {

                    if (!open) dialogs.closeDialog();

                }}

            />

            <ConfirmActionDialog

                open={dialogs.dialogType === "delete"}

                title="Supprimer cet évènement ?"

                description={`"${dialogs.selectedEvent?.title}" sera définitivement supprimé. Cette action est irréversible.`}

                confirmLabel="Supprimer"

                confirmVariant="destructive"

                loading={deleting}

                onCancel={dialogs.closeDialog}

                onConfirm={handleConfirmDelete}

            />

        </AppLayout>

    );

}