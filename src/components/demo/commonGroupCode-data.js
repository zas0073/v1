import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "Name",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "FullName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "Age",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "Company",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "Email",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "Name",
    fieldName: "Name",
    width: "80",
    header: {
      text: "공통 그룹코드",
    },
  },
  {
    name: "FullName",
    fieldName: "FullName",
    width: "150",
    header: {
      text: "공통 그룹코드명",
    },
  },
  {
    name: "Company",
    fieldName: "Company",
    width: "220",
    styles: {
      textAlignment: "center",
    },
    header: "공통 그룹코드 상세 설명",
  },
  {
    name: "Age",
    fieldName: "Age",
    width: "130",
    header: {
      text: "사용여부",
    },
    numberFormat: "0",
  },
  {
    name: "Email",
    fieldName: "Email",
    width: "300",
    header: {
      text: "상태",
    },
  },
];

export const rows = [
  {
    Name: "Kessie",
    FullName: "Vijendra N. Raj",
    Email: "mus.Donec.dignissim@Praesent.edu",
    Company: "Arcu Et Pede Incorporated",
    Age: "17",
  },
  {
    Name: "John",
    FullName: "John Doe",
    Email: "john.doe@example.com",
    Company: "Example Company",
    Age: "25",
  },
  {
    Name: "Jane",
    FullName: "Jane Smith",
    Email: "jane.smith@example.com",
    Company: "Another Company",
    Age: "30",
  },
  {
    Name: "Alice",
    FullName: "Alice Johnson",
    Email: "alice.johnson@example.com",
    Company: "ABC Corporation",
    Age: "40",
  },
  {
    Name: "Bob",
    FullName: "Bob Brown",
    Email: "bob.brown@example.com",
    Company: "XYZ Corporation",
    Age: "35",
  },
  {
    Name: "Mary",
    FullName: "Mary Johnson",
    Email: "mary.johnson@example.com",
    Company: "DEF Corporation",
    Age: "28",
  },
  {
    Name: "Michael",
    FullName: "Michael Smith",
    Email: "michael.smith@example.com",
    Company: "GHI Corporation",
    Age: "32",
  },
  {
    Name: "Emma",
    FullName: "Emma Davis",
    Email: "emma.davis@example.com",
    Company: "JKL Corporation",
    Age: "45",
  },
  {
    Name: "William",
    FullName: "William Wilson",
    Email: "william.wilson@example.com",
    Company: "MNO Corporation",
    Age: "22",
  },
  {
    Name: "Olivia",
    FullName: "Olivia White",
    Email: "olivia.white@example.com",
    Company: "PQR Corporation",
    Age: "38",
  },
];
