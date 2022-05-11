import {IAccountDataTable} from "./accounts.interface";
import React from "react";

export interface EnhancedTableToolbarProps {
    selectedList: string[];
    gatheredAccountList: IAccountDataTable[];
    setGatheredAccountList: React.Dispatch<React.SetStateAction<IAccountDataTable[]>>
}