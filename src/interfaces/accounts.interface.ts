export interface IAccountDataTable {
    Code: string,
    Providers: string[],
    Medias: string[],
    Parameters: string[],
    Measure: number,
    NbrAccount: number,
    LawlimitEC: { avg: number, nbList: number[] },
    LawlimitWHO: { avg: number, nbList: number[] },
    EQsEC: { avg: number, nbList: number[] },
    EQsWHO: { avg: number, nbList: number[] }
}