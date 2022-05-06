export interface TABLE_COLUMN {
    field: string;
    header: string;
    subfield?: string;
    innerSubField?: string;
    sort?: string;
    type?: string;
    imagePath?: string;
    isEdit?: boolean;
    isUnderline?: boolean;
    links?: Array<any>;
    event?: string;
    buttonList?: Array<any>;
    option?: Array<any>;
    addRowType?: string;
    isDate?: boolean;
    isInlineEdit?: boolean;
    isId?: boolean;
    
}
