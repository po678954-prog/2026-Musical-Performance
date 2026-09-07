export interface Song {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  youtubeVideoId: string;
  youtubeTitle: string;
  pdfFile: string;
  pdfUrl: string;
  aliases: string[];
  act: string;
  author: string;
  language: string;
  keyInfo: string;
  tempo: string;
  notes?: string;
  scripture?: string;
  lyrics?: string[];
}

export interface ProgramPageData {
  title: string;
  subtitle: string;
  year: string;
  dateLocation: string;
  quote: string;
  organizer: string;
  coOrganizers: string[];
}
