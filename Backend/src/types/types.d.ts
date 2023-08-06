export type mysqlReturnType = [
  OkPacket | 
  ResultSetHeader | 
  RowDataPacket[] | 
  RowDataPacket[][] | 
  OkPacket[] |
  FieldPacket[]
];
