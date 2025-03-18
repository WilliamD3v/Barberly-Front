import styled from "styled-components";

export const Section = styled.section`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #495057;
  margin-bottom: 15px;
`;

export const TableHead = styled.th`
  padding: 12px;
  background-color: #343a40;
  color: #fff;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

export const BoxTableCell = styled.div`
  display: flex;
  gap: 1rem;
`

export const BoxButtonTableCell = styled.div`
  display: flex;
  gap: 10px;
`

export const ButtonTableCellTrue = styled.button`
 background-color: #00B200;
 color: #ffff;
 text-align: center;
 font-size: 20px;
 width: 1.8rem;
`

export const ButtonTableCellFalse = styled.button`
 background-color: #CA0D0D;
 color: #ffff;
 text-align: center;
 font-size: 20px;
 width: 1.8rem;
`
