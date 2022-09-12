export type FormData = {
    ourl: string;
    murl?: string;
};

export type ItemInputFile = {
    title: string;          // Login form title
    root: string;           // Group folder
    short: string;          // Filename relative to root; const fname = path.join(f.root, f.short)
};

export type ItemDuplicate = {
    file: string;
};

export type ItemError = {
    text: string;           // Error message text
    isError?: boolean;      // Is error or information
};

// Types of report item for addToReport()

export type Report_InputFiles = {
    input?: ItemInputFile[];
};

export type Report_Duplicates = {
    multiple?: ItemDuplicate[];
};

export type Report_Errors = {
    errors?: ItemError[];
};

export type ReportAddParams = Report_InputFiles | Report_Duplicates | Report_Errors;

export type ReportRecord = {
    inputs?: Report_InputFiles;
    domcreds?: Report_Duplicates;
    errors?: Report_Errors;
};

export type Report = Record<string, ReportRecord>; // root folder -> ReportRecord
