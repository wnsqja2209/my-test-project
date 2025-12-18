declare module "@vercel/og" {
  export interface ImageResponseOptions {
    width?: number;
    height?: number;
    fonts?: Array<{
      name: string;
      data: ArrayBuffer;
      style?: "normal" | "italic";
      weight?: number;
    }>;
  }

  export class ImageResponse extends Response {
    constructor(
      element: React.ReactElement,
      options?: ImageResponseOptions
    );
  }
}


