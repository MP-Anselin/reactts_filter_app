import {IAccountDataTable} from "./accounts.interface";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof IAccountDataTable;
    label: string;
    numeric: boolean;
}