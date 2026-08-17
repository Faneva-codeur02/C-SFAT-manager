export interface EventFilters {

    search?: string;

    eventType?: import("./event.types").EventType;

    status?: import("./event.types").EventStatus;

}

export interface EventPagination {

    page: number;

    pageSize: number;

}