import {HeadCell} from "../interfaces";

export const headCells: readonly HeadCell[] = [
    {
        id: 'Code',
        numeric: false,
        disablePadding: true,
        label: 'Code',
    },
    {
        id: 'Providers',
        numeric: false,
        disablePadding: false,
        label: 'Providers',
    },
    {
        id: 'Medias',
        numeric: false,
        disablePadding: false,
        label: 'Media',
    },
    {
        id: 'Parameters',
        numeric: false,
        disablePadding: false,
        label: 'Parameters',
    },
    {
        id: 'Measure',
        numeric: true,
        disablePadding: false,
        label: 'Measure (sum)',
    },
    {
        id: 'LawlimitEC',
        numeric: true,
        disablePadding: false,
        label: 'Law limit EC (average)',
    },
    {
        id: 'LawlimitWHO',
        numeric: true,
        disablePadding: false,
        label: 'Law limit WHO (average)',
    },
    {
        id: 'EQsEC',
        numeric: true,
        disablePadding: false,
        label: 'EQS EC (average)',
    },
    {
        id: 'EQsWHO',
        numeric: true,
        disablePadding: false,
        label: 'EQS WHO (average)',
    },
    {
        id: 'NbrAccount',
        numeric: true,
        disablePadding: false,
        label: 'Number Of Account',
    },
];