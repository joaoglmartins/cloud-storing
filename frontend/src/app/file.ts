export class File {
    name: string;
    size: number;
    url: string;
    lastModified: Date;

    constructor(
        name: string,
        size: number,
        url: string,
        lastModified: Date
    ) { 
        this.name = name;
        this.size = size;
        this.url = url;
        this.lastModified = lastModified;
    }

    get formattedSize(): string {
        if (this.size < 1024) {
            return `${this.size} B`;
        } else if (this.size < 1024 * 1024) {
            return `${(this.size / 1024).toFixed(2)} KB`;
        } else if (this.size < 1024 * 1024 * 1024) {
            return `${(this.size / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(this.size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    }

    get formattedDate(): string {
        return this.lastModified.toLocaleDateString() + ' ' + this.lastModified.toLocaleTimeString();
    }
}
