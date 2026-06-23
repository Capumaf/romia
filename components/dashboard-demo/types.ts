export type Sender = "romia" | "client";

export type Message = {
sender: Sender;
text: string;
time?: string;
};

export type LeadProfile = {
name?: string;
district?: string;
budget?: string;
bedrooms?: string;
leadStatus?: string;
score?: number;
};

export type DemoEvent = {
id: number;

message?: Message;

updates?: Partial<LeadProfile>;
};
