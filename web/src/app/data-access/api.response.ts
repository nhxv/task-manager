export class ApiResponse {
  constructor(
    public status: number,
    public message: string,
    public result: Object
  ) {}
}
